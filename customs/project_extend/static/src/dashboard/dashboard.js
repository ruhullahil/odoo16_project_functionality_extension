/** @odoo-module **/

import { _t } from "@web/core/l10n/translation";
import { Component, onWillStart, onMounted, useState, useEffect, whenReady, useRef, onRendered } from "@odoo/owl";
import { download } from "@web/core/network/download";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { Layout } from "@web/search/layout";
import { useSetupAction } from "@web/webclient/actions/action_hook";
import { ControlPanel } from "@web/search/control_panel/control_panel";
import { patch } from "@web/core/utils/patch";

export class ProjectDashboard extends Component{

    setup(){
        console.log('---------------------start-------------')
        this.orm = useService("orm");
        this.user = useService("user");
        this.model = 'project.project';
        this.action = useService("action");


        this.state = useState({
            kanban_state : [],
            task_stage : [],
            projects : [],
            users : [],
            selected_project : null,
            selected_users : null,
            selected_date : null,


        });




        this.display = {
            controlPanel: false,
            searchPanel: false,
            banner: false,
        };
        whenReady(() => {
            try{
                this.fetchData();


            }catch (error) {
                console.log("---> Error --> The product object doesn't exist ", error)
            }
        });
        onMounted(this.onMounted);


//        onRendered(() => {
//            // alert(this.state.currentStatus);
//            // console.log(document.getElementById('product_brand_option'));
//        })
    }

    async onMounted() {
		// Render other components after fetching data
		this.render_project_task();

	}

    async fetchData() {
        try{
            console.log('state',this.state)
            this.orm.call(this.model, "get_project_task_data", [this.state.selected_project,this.state.selected_users,this.state.selected_date,]).then(result => {
                this.state.kanban_state = result['kanban_state'];
                this.state.projects = result['projects'];
                this.state.users = result['users'];
                this.state.task_stage = result['task_stage'];
            });
        }catch (error) {
            console.log("---> Error --> The product object doesn't exist ", error)
        }
    }
    async onOptionChanged(type,value){
    console.log(type,value)
        this.state[type] = value
        console.log(type,this.state[type])
        this.fetchData()
        this.render_project_task()
    }
    async render_project_task() {
            var self = this
            this.orm.call("project.project","get_project_task_count",[this.state.selected_project,this.state.selected_users,this.state.selected_date,]
            ).then(function(data) {
                var ctx = $("#project_doughnut");
                new Chart(ctx, {
                    type: "doughnut",
                    data: {
                        labels: data.project,
                        datasets: [{
                            backgroundColor: data.color,
                            data: data.task
                        }]
                    },
                    options: {
                        legend: {
                            position: 'left'
                        },
                        cutoutPercentage: 40,
                        responsive: true,
                    }
                });
            })
        }

//     async goto_form_view(){
//        this.action.doAction({
//           type: 'ir.actions.act_window',
//           res_model: this.model,
//           views: [[false, 'form']],
//           res_id: this.context.active_id,
//        });
//   }

}
ProjectDashboard.template = 'project_extend.CustomDashboard';
ProjectDashboard.components = { Layout };
registry.category("actions").add("project_custom_dashboard", ProjectDashboard);