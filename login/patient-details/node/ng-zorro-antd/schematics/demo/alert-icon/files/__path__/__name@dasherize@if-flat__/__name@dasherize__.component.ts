import { Component } from '@angular/core';

@Component({
  selector: '<%= selector %>',
  <% if(inlineTemplate) { %>template: `
    <nz-alert nzType="success" nzMessage="Success Tips" nzShowIcon></nz-alert>
    <nz-alert nzType="info" nzMessage="Informational Notes" nzShowIcon></nz-alert>
    <nz-alert nzType="warning" nzMessage="Warning" nzShowIcon></nz-alert>
    <nz-alert nzType="error" nzMessage="Error" nzShowIcon></nz-alert>
    <nz-alert
      nzType="success"
      nzMessage="Success Tips"
      nzDescription="Detailed description and advices about successful copywriting."
      nzShowIcon
    >
    </nz-alert>
    <nz-alert
      nzType="info"
      nzMessage="Informational Notes"
      nzDescription="Additional description and informations about copywriting."
      nzShowIcon
    >
    </nz-alert>
    <nz-alert
      nzType="warning"
      nzMessage="Warning"
      nzDescription="This is a warning notice about copywriting."
      nzShowIcon
    >
    </nz-alert>
    <nz-alert nzType="error" nzMessage="Error" nzDescription="This is an error message about copywriting." nzShowIcon>
    </nz-alert>
  `<% } else { %>templateUrl: './<%= dasherize(name) %>.component.html'<% } %>,
  <% if(inlineStyle) { %>styles: [`
      nz-alert {
        margin-bottom: 16px;
      }
    `]<% } else { %>styleUrls: ['./<%= dasherize(name) %>.component.<%= style %>']<% } %>
})
export class <%= classify(name) %>Component {}
