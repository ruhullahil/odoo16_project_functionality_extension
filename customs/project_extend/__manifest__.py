# -*- coding: utf-8 -*-
{
    'name': "Project Extend",

    'summary': """
    this module used for extend project functionality some record rule and add teams
    """,

    'description': """
        Each project has a team assigned. In each team, we have members. Projects should only be visible to the team members.
        Create a dashboard to display the total no of tasks, with filters for this week, this month, the previous week, and the previous month.
        Good to have: Make a filter for assignees where we can click on the assignee, it will filter the tasks for the assignee.

    """,

    'author': 'Md. Ruhullahil Kabir',
    'maintainer': 'Ruhullahil Kabir',

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/16.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Project Management',
    'version': '16.0',

    # any module necessary for this one to work correctly
    'depends': ['base', 'project_team'],

    # always loaded
    'data': [
        # 'security/ir.model.access.csv',
        'security/security.xml',
        'views/views.xml',
        'views/templates.xml',
    ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'project_extend/static/src/dashboard/dashboard.xml',
            'project_extend/static/src/dashboard/dashboard.js',
            'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js',

        ],
    },
}
