package main

import (
	"fmt"
	"math/rand"
)

type ProbMap map[int]Probs
type Probs struct {
	base, incrmnt int
}
type Grid [][]int

const (
	numRws   = 9
	numRnds  = 8
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

func (g Grid) gnrtMp(newMap bool) Grid {
	for i := 0; i < numRnds; i++ {
		if i == 0 && newMap {
			g = g.gnrtCntnnts(true)
		} else {
			g = g.gnrtCntnnts(false)
		}
	}
	return g
}

func (g Grid) gnrtCntnnts(first bool) Grid {
	if first {
		for i := 0; i < len(g); i++ {
			for j := 0; j < len(g[0]); j++ {
				g[i][j] = rand.Intn(2)
			}
		}
	} else {
		for i := 0; i < len(g); i++ {
			for j := 0; j < len(g[0]); j++ {
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
			}
		}
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
	for a := 0; a < len(vrtcs); a++ {
		r := i + vrtcs[a][0]
		t := j + vrtcs[a][1]
		if r >= 0 && t >= 0 && r < len(g) && t < len(g[0]) {
			numOcrncs[g[r][t]]++
		}
	}
	return numOcrncs
}

func (g Grid) gnrtTrrn(first bool) Grid {
	if first {

	} else {

	}
	return g
}

func main() {
	var grid Grid
	grid = grid.create(numRws, numRws)
	grid = grid.gnrtMp(true)
	grid = grid.scale(2)
	grid = grid.gnrtMp(false)
	grid = grid.scale(4)
	grid = grid.gnrtMp(false)
	grid = grid.scale(2)
	grid = grid.gnrtMp(false)
	// fmt.Println(grid.JSON())
	fmt.Println(grid.GraphicString())
	// grid = gnrtTrrn(grid, true)
}
