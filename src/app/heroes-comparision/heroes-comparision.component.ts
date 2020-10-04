import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap,catchError } from 'rxjs/operators';
import { SuperHero } from '../_shared/model/superHero';
import { DataService } from '../_shared/services/data.service';

@Component({
  selector: 'app-heroes-comparision',
  templateUrl: './heroes-comparision.component.html',
  styleUrls: ['./heroes-comparision.component.css']
})
export class HeroesComparisionComponent implements OnInit {
  superHeroControl = new FormControl();

  superHeroes = [];

  selectedSuperHeroes: SuperHero[] = new Array<SuperHero>();

  filteredSuperHeroes: Observable<SuperHero[]>;
  lastFilter: string = '';

  constructor(private dataService: DataService) { }
  ngOnInit() {
    this.filteredSuperHeroes = this.superHeroControl.valueChanges.pipe(
      startWith<string | SuperHero[]>(''),
      debounceTime(400),
      distinctUntilChanged(),
      map(value => typeof value === 'string' ? value : this.lastFilter),
      switchMap(value => {

        return this.filter(value)

      })
    );
  }

  filter(filter: string): Observable<any[]> {
    this.lastFilter = filter;
    if (filter) {
      return this.dataService.searchSuperHeroes(filter)
        .pipe(
          //map(response => response.results.map(hero => new SuperHero(hero.id, hero.name, hero.powerstats, this.selectedStatus(hero.id))))
          map(response => {
            // if none of the items has a late delivery
            if(response.results) {
              return response.results.map(hero => new SuperHero(hero.id, hero.name, hero.powerstats, this.selectedStatus(hero.id)));
            }
            else{
              alert("Error occurred while fetching data");
              return [];
            }
          })
        )
    }
    else {
      return of(this.superHeroes)
    }
  }

  selectedStatus(id: number): boolean {
    const superHero = this.selectedSuperHeroes.find(hero => hero.id === id);
    return superHero ? true : false;
  }


  displayFn(value: SuperHero[] | string): string | undefined {
    let displayValue: string;
    if (Array.isArray(value)) {
      value.forEach((hero, index) => {
        if (index === 0) {
          displayValue = hero.name;
        } else {
          displayValue += ', ' + hero.name;
        }
      });
    } else {
      displayValue = value;
    }
    return displayValue;
  }

  optionClicked(event: Event, hero: SuperHero) {
    event.stopPropagation();
    this.toggleSelection(hero);
  }

  toggleSelection(hero: SuperHero) {
    if (this.selectedSuperHeroes.length < 4) {
      hero.selected = !hero.selected;
      if (hero.selected) {
        this.selectedSuperHeroes.push(hero);
      } else {
        this.selectedSuperHeroes = this.selectedSuperHeroes.filter(value => value.id !== hero.id);
      }
      this.superHeroControl.setValue(this.selectedSuperHeroes);
      this.prepareChartData();

    }
  }

  clearSearchField() {
    this.lastFilter = "";
    this.selectedSuperHeroes = [];
    this.superHeroControl.reset();
    this.dataService.changeData("default message");
  }

  compare() {
    if (this.selectedSuperHeroes.length > 0) {
      const idList=this.selectedSuperHeroes.map(hero=>hero.id);
    this.dataService.getPwerstatsById(idList).subscribe(results => {
      const chartData=results.map(data=>{
        let herodata=data;
        delete herodata.response;
        delete herodata.id;
        return herodata
      });
      this.dataService.changeData(chartData);
    });
    }

  }

  prepareChartData() {
    if (this.selectedSuperHeroes.length > 0) {
      const chartData = this.selectedSuperHeroes.map(hero => {
        let powerStatData = hero.powerstats;
        powerStatData.name = hero.name;
        return powerStatData;
      });
      this.dataService.changeData(chartData);

    }
  }
}
