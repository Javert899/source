import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PmodelComponent } from './pmodel/pmodel.component';
import { CasesComponent } from './cases/cases.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { PlistComponent } from './plist/plist.component';
import { SnaComponent } from './sna/sna.component';
import { TransientComponent } from './transient/transient.component';
import { AlignmentsComponent } from './alignments/alignments.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'pmodel',
                component: PmodelComponent,
                data: {
                    title: 'PmodelComponent'
                }
            },
            {
                path: 'pmodel2',
                component: PmodelComponent,
                data: {
                    title: 'PmodelComponent'
                }
            },
            {
                path: 'cases',
                component: CasesComponent,
                data: {
                    title: 'CasesComponent'
                }
            },
            {
                path: 'statistics',
                component: StatisticsComponent,
                data: {
                    title: 'StatisticsComponent'
                }
            },
            {
                path: 'login',
                component: LoginComponentComponent,
                data: {
                    title: 'LoginComponent'
                }
            },
            {
                path: 'plist',
                component: PlistComponent,
                data: {
                    title: 'ProcessList'
                }
            },
            {
                path: 'plist2',
                component: PlistComponent,
                data: {
                    title: 'ProcessList'
                }
            },
            {
                path: 'sna',
                component: SnaComponent,
                data: {
                    title: 'SNA'
                }
            },
            {
                path: 'transient',
                component: TransientComponent,
                data: {
                    title: 'Transient Analysis'
                }
            },
            {
                path: 'alignments',
                component: AlignmentsComponent,
                data: {
                    title: 'Alignments'
                }
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RealWsRoutingModule { }
