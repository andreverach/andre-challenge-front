import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path: "",
        redirectTo: "/auth/login",
        pathMatch: "full"
    },
    {
        path: "home",
        loadComponent: () => import("./modules/example-page/example-page.component").then((m) => m.ExamplePageComponent)
    },    
    {
        path: 'auth',        
        children: [
          {
            path: 'login',
            loadChildren: () => import('./modules/auth/auth-routing.module').then(m => m.AuthRoutingModule),
          },
        ]
    },
    {
        path: 'tasks',        
        children: [
          {
            path: 'list',
            loadChildren: () => import('./modules/task/task-routing.module').then(m => m.TaskRoutingModule),
          },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
