# Generated by Django 3.1 on 2021-04-07 07:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0035_word_language'),
    ]

    operations = [
        migrations.AlterField(
            model_name='word',
            name='word',
            field=models.CharField(db_index=True, max_length=50, verbose_name='A word'),
        ),
    ]
