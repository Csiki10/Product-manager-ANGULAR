import { Component } from '@angular/core';
import { Product } from './product';
import { Comment } from './comment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-app';

  products: Array<Product> = [];
  comments: Array<Comment> = [];
  selectedProduct: Product = new Product

  constructor() {
    this.fetchData();  
  }

  async fetchData() {
    const url = 'https://dummyjson.com/products?limit=100'
    const urlc = 'https://dummyjson.com/comments?limit=100'
    
    let obj = (await (await fetch(url)).json()).products
    let allComment = (await (await fetch(urlc)).json()).comments

    obj.map(async (x: any) => {
      let o = new Product();
        o.id = x.id,
        o.title = x.title,
        o.description = x.description,
        o.price = x.price,
        o.discountPercentage = x.discountPercentage,
        o.rating = x.rating,
        o.stock = x.stock,
        o.brand = x.brand,
        o.category = x.category,
        o.thumbnail = x.thumbnail,
        o.images = x.images,           
      this.products.push(o)
    })

    allComment.map(async (x: any) => {
      let comment = new Comment(
        x.id,
        x.body,
        x.postId,
        x.user
      );
                  
      this.comments.push(comment)
    })

    console.log(this.comments)
  }

  rowColor(stock: number): string {
    if (stock >= 0 && stock <= 50) {
      return 'table-danger';
    } else if (stock > 50 && stock <= 100) {
      return 'table-warning';
    } else {
      return 'table-success';
    }
  }

  Delete(id: number) {
    
    let index = this.products.findIndex(x => x.id === id)
    this.products.splice(index, 1)

    fetch('https://dummyjson.com/products/'+id, {
    method: 'DELETE',
    })
    .then(res => res.json())
    .then(console.log);
  }

  CountCategory() {
    const categoryCounts: { [key: string]: number } = {};
    this.products.forEach((product) => {
      if (categoryCounts[product.category]) {
        categoryCounts[product.category]++;
      } else {
        categoryCounts[product.category] = 1;
      }
    });

    let result = 'Kategóriák darabszáma:\n';
    for (const category in categoryCounts) {
      result += `${category}: ${categoryCounts[category]}\n`;
    }

    alert(result);
  }

  MaxDiscount() {
    let maxDiscount = 0;

    this.products.forEach((product) => {
      if (product.discountPercentage > maxDiscount) {
        maxDiscount = product.discountPercentage;
      }
    });

    alert(`A legnagyobb kedvezmény: ${maxDiscount}%`);
  }

  MoreInfoFromProduct(product: Product) {
    this.selectedProduct = product;
  
    var el = document.getElementById("asd");
    el?.classList.remove("d-none");  
  }

  PriceLevel() {
    let total = 0;
    let count = 0;
    let averagePrice = 0;
    let aboveAverageProducts: { id: number; title: string }[] = [];

    this.products.forEach((product) => {
      total += product.price;
      count++;
    });

    if (count > 0) {
      averagePrice = total / count;

      this.products.forEach((product) => {
        if (product.price > averagePrice) {
          aboveAverageProducts.push({ id: product.id, title: product.title });
        }
      });
    }

    if (aboveAverageProducts.length > 0) {
      let result = "A következő termékek vannak az átlagos árszint felett:\n";
      
      aboveAverageProducts.forEach((product) => {
        result += `ID: ${product.id}, Név: ${product.title}\n`;
      });

      result += `Átlagár: ${averagePrice.toFixed(2)}`; // Átlagár hozzáadása a kiíráshoz
      alert(result); // eredmény kiírása egy felugró ablakba
    } 
    else {
      alert("Nincsenek termékek az átlagos árszint felett.");
    }

  }

  Close() {
    var el = document.getElementById("asd");
    el?.classList.add("d-none");
  }
  
}
