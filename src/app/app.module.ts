import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { AuthModule } from "./modules/auth/auth.module";
import { CoreModule } from "./core/core.module";
import { TaskModule } from "./modules/task/task.module";

@NgModule({
    declarations: [
        AppComponent        
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CoreModule,
        AuthModule,
        TaskModule,        
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
