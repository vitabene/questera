package main

import (
	"fmt"
	"math/rand"
)

type ProbMap map[int]Probs
type Probs struct {
	base, incrmnt int
}
type Grid [nRws][nRws]int

func (g Grid) String() string {
	var str string
	for v, _ := range g {
		str += fmt.Sprintf("%v\n", g[v])
	}
	return fmt.Sprintf("%v\n", str)
}

const (
	nRws    = 40
	nRnds   = 4
	contP   = 45
	contInc = 10
)

var (
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

func main() {
	var grid Grid
	grid = gnrtMp(grid)
	fmt.Println(grid)
	// grid = gnrtTrrn(grid, true)
}

func gnrtMp(grid Grid) Grid {
	for i := 0; i < nRnds; i++ {
		if i == 0 {
			grid = gnrtCntnnts(grid, true)
		} else {
			grid = gnrtCntnnts(grid, false)
		}
	}
	return grid
}

func gnrtCntnnts(grid Grid, first bool) Grid {
	if first {
		for i := 0; i < len(grid); i++ {
			for j := 0; j < len(grid[0]); j++ {
				grid[i][j] = rand.Intn(2)
			}
		}
	} else {
		for i := 0; i < len(grid); i++ {
			for j := 0; j < len(grid[0]); j++ {
				probs := lndArnd(grid, i, j)
				base := contP
				for k, v := range probs {
					if k == 0 {
						base -= contInc * v
					} else {
						base += contInc * v
					}
				}
				rand := rand.Intn(101)
				if rand <= base {
					grid[i][j] = 1
				} else {
					grid[i][j] = 0
				}
			}
		}
	}
	// for debugging purposes
	fmt.Println(grid)
	return grid
}

func lndArnd(grid Grid, i, j int) map[int]int {
	numOcrncs := make(map[int]int)
	vrtcs := [][]int{
		{-1, -1}, {-1, 0}, {-1, 1},
		{0, -1}, {0, 1},
		{1, -1}, {1, 0}, {1, 1},
	}
	for a := 0; a < len(vrtcs); a++ {
		r := i + vrtcs[a][0]
		t := j + vrtcs[a][1]
		if r >= 0 && t >= 0 && r < nRws && t < nRws {
			numOcrncs[grid[r][t]]++
		}
	}
	return numOcrncs
}

func gnrtTrrn(grid Grid, first bool) Grid {
	if first {

	} else {

	}
	return grid
}
