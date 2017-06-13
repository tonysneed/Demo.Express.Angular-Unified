import { NgModule } from "@angular/core";
import { BrowserModule  } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { ProductsComponent } from "./products/products.component";
import { ProductService } from "./products/products.service";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
    ],
    declarations: [
        AppComponent,
        ProductsComponent,
    ],
    providers: [ProductService],
    bootstrap: [AppComponent],
})
export class AppModule { }
