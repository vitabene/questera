package main

import (
	"flag"
	"fmt"
	"math"
	"math/rand"
)

type ProbMap map[int]Probs
type Probs struct {
	base, incrmnt int
}
type Grid [][]int
type IterateGrid func(Grid, int, int) Grid

const (
	numRws   = 5
	numRnds  = 3
	contProb = 49
	contIncr = 7
)

var (
	trrnNms = map[int]string{
		1: "grass",
		2: "forest",
		3: "mountains",
		4: "field",
		5: "moor",
		6: "pond",
		7: "road",
		8: "river",
	}
	trrnPrbs = ProbMap{
		1: {38, 5},
		2: {33, 8},
		3: {10, 6},
		4: {6, 5},
		5: {5, 8},
		6: {4, 10},
		7: {2, 30},
		8: {2, 35},
	}
	seaPrbs = ProbMap{
		1: {40, 10},
		2: {20, 20},
		3: {40, 30},
	}
)

func mapper() {
	var grid Grid

	var numRwsP = flag.Int("nrws", numRws, "number of rows in a map")
	var numRnsP = flag.Int("nrnds", numRnds, "number of rows in a map")
	flag.Parse()
	grid = grid.create(*numRwsP, *numRwsP)
	grid = grid.rangeGrid(fillRandLand)
	grid = grid.gnrtMp(0)
	for i := 0; i < *numRnsP; i++ {
		grid = grid.scale(2)
		grid = grid.gnrtMp(1)
	}
	grid = grid.rangeGrid(fillRandTrrn)
	grid = grid.rangeGrid(gnrtTrrn)
	// grid = grid.gnrtTrrn(false)
	fmt.Println(grid.String())
	// for web
	// fmt.Println(grid.JSON())
	// for terminal visualization
	// fmt.Println(grid.GraphicString())
}

func (g Grid) rangeGrid(fn IterateGrid) Grid {
	for i, _ := range g {
		for j, _ := range g[i] {
			g = fn(g, i, j)
		}
	}
	return g
}

func fillRandLand(g Grid, i, j int) Grid {
	// 2 options - 1 = land, 0 = ocean
	g[i][j] = rand.Intn(2)
	return g
}

func fillRandTrrn(g Grid, i, j int) Grid {
	if g[i][j] == 1 {
		g[i][j] = rand.Intn(len(trrnPrbs))
	} else {
		g[i][j] = -rand.Intn(len(seaPrbs))
	}
	return g
}

func gnrtTrrn(g Grid, i, j int) Grid {
	probs := g.lndArnd(i, j)
	if g[i][j] > 0 {
		g[i][j] = getTrrn(getTrrnProbs(probs))
	} else {
		g[i][j] = getSea(getSeaProbs(probs))
	}
	return g
}

func getTrrn(percentages map[int]int) int {
	sum := 0
	for i, v := range percentages {
		percentages[i] = sum
		sum += v
	}
	var rn = rand.Intn(sum)
	for i := len(percentages); i >= 1; i-- {
		if rn > percentages[i] {
			return i
		}
	}
	return 0
}

func getSea(percentages map[int]int) int {
	// temp
	return 0
}

func (g Grid) scale(scaleTimes int) Grid {
	var newGrid Grid
	newGrid = newGrid.create(len(g)*scaleTimes, len(g[0])*scaleTimes)
	for i, _ := range g {
		for j, v := range g[i] {
			for k := 0; k < scaleTimes; k++ {
				for l := 0; l < scaleTimes; l++ {
					newGrid[i*scaleTimes+k][j*scaleTimes+l] = v
				}
			}
		}
	}
	return newGrid
}

func (g Grid) gnrtMp(numLoops int) Grid {
	if numLoops == 0 {
		numLoops = numRnds
	}
	for i := 0; i < numLoops; i++ {
		g = g.rangeGrid(gnrtCntnnts)
	}
	return g
}

func gnrtCntnnts(g Grid, i, j int) Grid {
	probs := g.lndArnd(i, j)
	base := contProb
	for k, v := range probs {
		if k == 0 {
			base -= contIncr * v
		} else {
			base += contIncr * v
		}
	}
	rand := rand.Intn(101)
	if rand <= base {
		g[i][j] = 1
	} else {
		g[i][j] = 0
	}
	// for debugging purposes
	// fmt.Println(g)
	return g
}

func (g Grid) lndArnd(i, j int) map[int]int {
	numOcrncs := make(map[int]int)
	vrtcs := [][]int{
		{-1, -1}, {-1, 0}, {-1, 1},
		{0, -1}, {0, 1},
		{1, -1}, {1, 0}, {1, 1},
	}
	for a, _ := range vrtcs {
		r := i + vrtcs[a][0]
		t := j + vrtcs[a][1]
		if r >= 0 && t >= 0 && r < len(g) && t < len(g[0]) {
			numOcrncs[g[r][t]]++
		}
	}
	return numOcrncs
}

func getTrrnProbs(probs map[int]int) map[int]int {
	trrnToProb := make(map[int]int)
	for k, prob := range trrnPrbs {
		v, ok := probs[k]
		if ok {
			base := prob.base
			base += int(math.Abs(float64(v))) * prob.incrmnt
			trrnToProb[k] = base
		} else {
			trrnToProb[k] = prob.base
		}
	}
	return trrnToProb
}

func getSeaProbs(probs map[int]int) map[int]int {
	seaToProb := make(map[int]int)
	for k, prob := range seaPrbs {
		v, ok := probs[k]
		if ok {
			base := prob.base
			base += int(math.Abs(float64(v))) * prob.incrmnt
			seaToProb[k] = base
		} else {
			seaToProb[k] = prob.base
		}
	}
	return seaToProb
}

func (g Grid) create(x, y int) Grid {
	grid := make([][]int, y)
	for i := range grid {
		grid[i] = make([]int, x)
	}
	return grid
}

func (g Grid) String() string {
	var str string
	for _, v := range g {
		str += fmt.Sprintf("%v\n", v)
	}
	return fmt.Sprintf("%v\n", str)
}

func (g Grid) GraphicString() string {
	str, landChar, seaChar := "", "■", "□"
	for i, _ := range g {
		for _, v := range g[i] {
			if v == 1 {
				str += fmt.Sprintf("%v ", landChar)
			} else {
				str += fmt.Sprintf("%v ", seaChar)
			}
		}
		str += "\n"
	}
	return fmt.Sprintf("%v", str)
}

func (g Grid) JSON() string {
	str := "{\n	\"map\":[\n"
	for i, _ := range g {
		str += "		["
		for j, v := range g[i] {
			str += fmt.Sprintf("%v", v)
			if j+1 != len(g[i]) {
				str += ", "
			}
		}
		str += "]"
		if i+1 != len(g) {
			str += ","
		}
		str += "\n"
	}
	str += "	]\n}"
	return fmt.Sprintf("%v\n", str)
}
