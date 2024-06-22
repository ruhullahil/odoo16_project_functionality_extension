# -*- coding: utf-8 -*-

from odoo import models, fields, api
from datetime import date, timedelta


class Project(models.Model):
    _inherit = 'project.project'

    def _get_stage_wise_task_data(self, domain):
        lead_data = self.env['project.task'].with_context(active_test=False)._read_group(
            domain,
            ['kanban_state'],
            ['kanban_state']
        )
        mapped_data = [(data['kanban_state'], data['kanban_state_count']) for data in lead_data]
        return mapped_data

    def _get_projects(self):
        domain = [('company_id', '=', self.env.company.id)]
        projects = self.env['project.project'].search(domain)
        list_project = []
        for project in projects:
            list_project.append((project.id, project.name))
        return list_project

    def _get_users(self):
        domain = [('company_id', '=', self.env.company.id)]
        users = self.env['res.users'].search(domain)
        list_users = []
        for user in users:
            list_users.append((user.id, user.name))
        return list_users

    def _process_date_domain(self,selection):
        process_dict = {
            'last_week': -7,
            'last_month': -30,
            'week': 7,
            'month': 30
        }
        today = date.today()
        domain_date = today + timedelta(days=process_dict.get(selection,0))
        return ('date_deadline','<=',domain_date)


    @api.model
    def get_project_task_data(self, selected_project=None, selected_user=None, selected_date=None):
        domain = [('company_id', '=', self.env.company.id)]

        if selected_project and selected_project != 'null':
            domain.append(('project_id', '=', int(selected_project)))
        if selected_user and selected_user != 'null':
            domain.append(('user_ids', '=', int(selected_user)))
        if selected_date and selected_date != 'null':
            domain.append(self._process_date_domain(selected_date))

        kanban_state = self._get_stage_wise_task_data(domain=domain)
        list_project = self._get_projects()
        list_users = self._get_users()

        return {'kanban_state': kanban_state,
                'projects': list_project,
                'users': list_users,
                }
