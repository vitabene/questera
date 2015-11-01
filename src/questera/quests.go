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
	QuestName, QuestType           string
}

func createQuest(questName, questType, created string, heroLoggedId int) (bool, error) {
	query := "INSERT INTO quests (hero_id, name, type, created, completed) VALUES ('" + string(heroLoggedId) + "', '" + questName + "','" + questType + "','" + created + "', '0')"
	_, _, err := db.Query(query)
	if err != nil {
		log.Println(err)
		return false, err
	}
	return true, nil
}

func loadQuests(HeroId string) []Quest {
	var quests []Quest
	query := "SELECT * FROM quests WHERE hero_id=" + HeroId
	log.Printf("%s\n", query)
	rows, res, err := db.Query(query)
	if err != nil {
		log.Println(err)
		return nil
	}
	for _, row := range rows {
		id, heroId := row.Int(res.Map("id")), row.Int(res.Map("hero_id"))
		created, completed := row.Int(res.Map("created")), row.Int(res.Map("completed"))
		questName, questType := row.Str(res.Map("name")), row.Str(res.Map("type"))
		quest := &Quest{Id: id, HeroId: heroId, Created: created, Completed: completed, QuestName: questName, QuestType: questType}
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
