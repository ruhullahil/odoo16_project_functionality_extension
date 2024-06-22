# -*- coding: utf-8 -*-

from odoo import models, fields, api


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

    def get_project_task_data(self, context={}):
        domain = [('company_id', '=', self.env.company.id)]
        filter_data = context
        if filter_data.get('date', None):
            pass
        kanban_state = self._get_stage_wise_task_data(domain=domain)
        list_project = self._get_projects()
        list_users = self._get_users()

        return {'kanban_state': kanban_state,
                'projects': list_project,
                'users': list_users,
                }
