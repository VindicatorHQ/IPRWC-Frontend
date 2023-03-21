import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CategoryInterface} from "../models/category.interface";
import {Observable} from "rxjs";

const CATEGORY_MAPPING = '/category';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  public createCategory(category: CategoryInterface): Observable<CategoryInterface> {
    return this.http.post<CategoryInterface>(CATEGORY_MAPPING, category, httpOptions);
  }

  public getAllCategories(): Observable<CategoryInterface[]> {
    return this.http.get<CategoryInterface[]>(CATEGORY_MAPPING);
  }

  public getCategoryById(categoryId: string): Observable<CategoryInterface> {
    return this.http.get<CategoryInterface>(CATEGORY_MAPPING + "/" + categoryId);
  }

  public updateCategory(category: CategoryInterface): Observable<CategoryInterface> {
    return this.http.put<CategoryInterface>(CATEGORY_MAPPING + "/" + category.id, category);
  }

  public deleteCategory(categoryId: string): Observable<String> {
    return this.http.delete(CATEGORY_MAPPING + "/" + categoryId, {responseType: 'text'});
  }
}
