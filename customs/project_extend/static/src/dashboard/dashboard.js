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

//        onRendered(() => {
//            // alert(this.state.currentStatus);
//            // console.log(document.getElementById('product_brand_option'));
//        })
    }

    async fetchData() {
        try{
            this.orm.call(this.model, "get_project_task_data", [this.state,]).then(result => {
                this.state.kanban_state = result['kanban_state'];
                this.state.projects = result['projects'];
                this.state.users = result['users'];
            });
        }catch (error) {
            console.log("---> Error --> The product object doesn't exist ", error)
        }
    }
    async onOptionChanged(type,value){
    console.log(type,value)
        this.state[type] = value
        console.log(type,this.state[type])
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