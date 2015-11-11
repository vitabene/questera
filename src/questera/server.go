package main

import (
	"encoding/json"
	"gopkg.in/mgo.v2"
	"html/template"
	"log"
	"net/http"
	"regexp"
	"strings"
)

type Page struct {
	Title, Hero string
}

var (
	templates     = template.Must(template.ParseFiles("views/index.html", "views/app.html"))
	staticRoutes  = []string{"/login", "/logout", "/about"}
	dynamicRoutes = regexp.MustCompile("^/api/(hero|quests|map)/?(create|start|complete)?/?([0-9]+)?$")
	db            *mgo.Database
	session       *mgo.Session
)

func viewHandler(w http.ResponseWriter, r *http.Request, name string) {
	heroId, err := heroPresent(r)
	if err != nil {
		p := &Page{Title: "Questera", Hero: "{}"}
		renderTemplate(w, "index", p)
		return
	}
	heroJson, err := json.Marshal(getHero(heroId))
	isFatal(err)
	p := &Page{Title: "Questera", Hero: string(heroJson)}
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

func main() {
	session, err := mgo.Dial("localhost")
	if err != nil {
		panic(err)
	}
	defer session.Close()
	session.SetMode(mgo.Monotonic, true)
	db = session.DB("questera")
	log.Println("db good")

	http.HandleFunc("/", makeHandler(viewHandler))
	http.HandleFunc("/api/hero/", makeHandler(heroHandler))
	http.HandleFunc("/api/quests/", makeHandler(questHandler))
	http.HandleFunc("/api/quests/create", createQuestHandler)
	http.HandleFunc("/api/map/", makeHandler(mapHandler))
	http.HandleFunc("/signup", signupHandler)
	http.HandleFunc("/login", loginHandler)
	http.HandleFunc("/logout", logoutHandler)

	http.Handle("/css/", http.StripPrefix("/css/", http.FileServer(http.Dir("css"))))
	http.Handle("/build/", http.StripPrefix("/build/", http.FileServer(http.Dir("build"))))
	http.Handle("/assets/", http.StripPrefix("/assets/", http.FileServer(http.Dir("build"))))

	port := "8080"
	log.Println("Server started: http://localhost:" + port + "\n\n\n\n\n")
	log.Fatal(http.ListenAndServe(":" + port, nil))
}
