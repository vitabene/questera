package main

import (
	"fmt"
	"github.com/ziutek/mymysql/mysql"
	_ "github.com/ziutek/mymysql/native"
	"html/template"
	"log"
	"net/http"
	"regexp"
	"strings"
	"encoding/json"
)

type Page struct {
	Title, Hero string
}

var (
	templates     = template.Must(template.ParseFiles("views/index.html", "views/app.html"))
	staticRoutes  = []string{"/login", "/logout", "/about"}
	dynamicRoutes = regexp.MustCompile("^/api/(hero|quests|map)/?(create|start|complete)?/?([0-9]+)?$")
	db            mysql.Conn
)

func loadPage(title, hero string) (*Page, error) {
	return &Page{Title: title, Hero: hero}, nil
}

func viewHandler(w http.ResponseWriter, r *http.Request, name string) {
	heroId, err := heroPresent(r)
	if err != nil {
		p, err := loadPage("Questera", "{}")
		if err != nil {
			http.NotFound(w, r)
			return
		}
		renderTemplate(w, name, p)
		return
	}
	hero := getHero(heroId)
	heroJson, err := json.Marshal(hero)
	if err != nil {
		log.Println(err)
		return
	}
	p, err := loadPage("Questera", string(heroJson))
	if err != nil {
		http.NotFound(w, r)
		return
	}
	renderTemplate(w, "app", p)
	return
}

func makeHandler(fn func(http.ResponseWriter, *http.Request, string)) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path == "/" {
			fn(w, r, "index")
		} else {
			m := dynamicRoutes.FindStringSubmatch(r.URL.Path)
			con := contains(r.URL.Path, staticRoutes)
			if m == nil && !con {
				http.NotFound(w, r)
				return
			}
			// dynamic route
			if m != nil {
				var uri string
				if m[2] != "" {
					uri = strings.Join(m[2:], "/")
				} else {
					uri = m[3]
				}
				fn(w, r, uri)
			}
			// static route
			if con {
				fn(w, r, r.URL.Path[1:])
			}
		}
	}
}

func renderTemplate(w http.ResponseWriter, tmpl string, p *Page) {
	err := templates.ExecuteTemplate(w, tmpl+".html", p)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

// routes:

// dynamic ones:
// /api/heroes/:hero_id - get
// /api/quests/:hero_id - get, post
// /api/quest/start/:q_id - post
// /api/quest/complete/:q_id - post
// /api/map/:hero_id

// static ones:
// /
// /about
// /login
// /logout

func main() {
	db = mysql.New("tcp", "", "127.0.0.1:3306", "root", "", "questera")
	err := db.Connect()
	if err != nil {
		fmt.Println("Database says: \n", err)
	}
	// check if logged in
	http.HandleFunc("/", makeHandler(viewHandler))
	http.HandleFunc("/api/hero/", makeHandler(heroHandler))
	http.HandleFunc("/api/quests/", makeHandler(questHandler))
	http.HandleFunc("/api/map/", makeHandler(mapHandler))
	http.HandleFunc("/signup", signupHandler)
	http.HandleFunc("/login", loginHandler)
	http.HandleFunc("/logout", logoutHandler)
	// http.Handle("/css/", http.StripPrefix("/css/", http.FileServer(http.Dir("css"))))
	http.Handle("/build/", http.StripPrefix("/build/", http.FileServer(http.Dir("build"))))
	// http.Handle("/", http.FileServer(http.Dir("./build")))
	port := "8080"
	log.Println("Server started: http://localhost:" + port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
