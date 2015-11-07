package main

import (
	"encoding/json"
	"fmt"
	_ "github.com/ziutek/mymysql/native"
	"log"
	"net/http"
)

type Quest struct {
	Id, HeroId, Created, Completed int
	Name, Type                     string
}

type QuestJSON struct {
	Text, Created, Type string
}

func createQuestHandler(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var q QuestJSON
	err := decoder.Decode(&q)
	if err != nil {
		panic(err)
	}
	heroId, err := heroPresent(r)
	if err != nil {
		panic(err)
	}
	err = createQuest(q.Text, q.Type, q.Created, heroId)
	if err != nil {
		panic(err)
	}
	heroLoggedId := fmt.Sprintf("%d", heroId)
	quests := loadQuests(heroLoggedId)
	jsonQuests, err := json.Marshal(quests)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Fprint(w, string(jsonQuests))
}

func createQuest(questName, questType, created string, heroLoggedId int) error {
	heroId := fmt.Sprintf("%d", heroLoggedId)
	query := "INSERT INTO quests (hero_id, name, type, created, completed) VALUES ('" + heroId + "', '" + questName + "','" + questType + "','" + created + "', '0')"
	_, _, err := db.Query(query)
	if err != nil {
		return err
	}
	return nil
}

func loadQuests(HeroId string) []Quest {
	var quests []Quest
	query := "SELECT * FROM quests WHERE hero_id=" + HeroId
	rows, res, err := db.Query(query)
	if err != nil {
		log.Println(err)
		return nil
	}
	for _, row := range rows {
		id, heroId := row.Int(res.Map("id")), row.Int(res.Map("hero_id"))
		created, completed := row.Int(res.Map("created")), row.Int(res.Map("completed"))
		questName, questType := row.Str(res.Map("name")), row.Str(res.Map("type"))
		quest := &Quest{Id: id, HeroId: heroId, Created: created, Completed: completed, Name: questName, Type: questType}
		quests = append(quests, *quest)
	}
	return quests
}

func questHandler(w http.ResponseWriter, r *http.Request, name string) {
	if name == "" {
		heroId, err := heroPresent(r)
		if err != nil {
			log.Println(err)
			return
		}
		heroLoggedId := fmt.Sprintf("%d", heroId)
		quests := loadQuests(heroLoggedId)
		jsonQuests, err := json.Marshal(quests)
		if err != nil {
			fmt.Println(err)
			return
		}
		fmt.Fprint(w, string(jsonQuests))
	}
}
