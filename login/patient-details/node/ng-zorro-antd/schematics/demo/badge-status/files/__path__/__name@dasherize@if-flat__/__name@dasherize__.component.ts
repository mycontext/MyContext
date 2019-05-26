import { Component } from '@angular/core';

@Component({
  selector: '<%= selector %>',
  <% if(inlineTemplate) { %>template: `
    <nz-badge nzStatus="success"></nz-badge>
    <nz-badge nzStatus="error"></nz-badge>
    <nz-badge nzStatus="default"></nz-badge>
    <nz-badge nzStatus="processing"></nz-badge>
    <nz-badge nzStatus="warning"></nz-badge>
    <br />
    <nz-badge nzStatus="success" nzText="Success"></nz-badge>
    <br />
    <nz-badge nzStatus="error" nzText="Error"></nz-badge>
    <br />
    <nz-badge nzStatus="default" nzText="Default"></nz-badge>
    <br />
    <nz-badge nzStatus="processing" nzText="Processing"></nz-badge>
    <br />
    <nz-badge nzStatus="warning" nzText="Warning"></nz-badge>
    <br />
  `<% } else { %>templateUrl: './<%= dasherize(name) %>.component.html'<% } %>
})
export class <%= classify(name) %>Component {}
