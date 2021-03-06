
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {City} from "../Public/City";

import 'rxjs/add/operator/toPromise';


@Injectable()
export class CityService {
  constructor(private http:Http){}

  getWeather(){
    return this.http.get(`/api/bgs/weather/current?latitude=31.86142&longitude=117.25683`)
  }

  getLocation(position):Promise<City>{
    return this.http.get(`/api/v1/cities?type=search&latitude=${position.latitude}&longitude=${position.longitude}`)
      .toPromise()
      .then(response => response.json())//得到的为对象数组，转化为City类型
      .catch(err => console.log(err));
  }

  getHotCity():Promise<City[]>{
    return this.http.get('/api/v1/cities?type=hot')
      .toPromise()
      .then(response => response.json() as City[])//得到的为对象数组，转化为City类型
      .catch(err => console.log(err));
  }

  getAllCity():Promise<any>{
    return this.http.get('/api/v1/cities?type=group')
      .toPromise()
      .then(response => response.json())
      .catch(err => console.log(err));
  }

  getCity(id:Number):Promise<City>{
    return this.http.get('/api/v1/cities/'+id)
      .toPromise()
      .then(response => {
        return Promise.resolve(response.json());
      })
      .catch(err => console.log(err));
  }

  getSearchResult(cityId:Number,keyword:String){
    return this.http.get('/api/v1/pois?type=search&city_id='+cityId+'&keyword='+keyword)
      .toPromise()
      .then(response => response.json())
      .catch(err => console.log(err));
  }

  getLocationDetail(geohash:String){
    return this.http.get('/api/v2/pois/'+geohash)
      .toPromise()
      .then(response => {
        localStorage.setItem('location',JSON.stringify(response.json()));
        return response.json();
      })
      .catch(err => console.log(err));
  }

  setLocationSearchHistory(result:any){
    let locationHistory=localStorage.getItem('locationHistory');
    if(locationHistory){
      localStorage.setItem('locationHistory',locationHistory.concat('****',JSON.stringify(result)));
    }else{
      localStorage.setItem('locationHistory',JSON.stringify(result));
    }
  }

  getLocationSearchHistory(){
    return localStorage.getItem('locationHistory')?localStorage.getItem('locationHistory').split('****'):undefined;
  }

  clearLocationSearchHistory(){
    localStorage.removeItem('locationHistory');
  }
}
