# Generated by Django 3.1 on 2021-03-17 10:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0033_question_question_picture'),
    ]

    operations = [
        migrations.AddField(
            model_name='quiz',
            name='html_header',
            field=models.TextField(blank=True, null=True),
        ),
    ]