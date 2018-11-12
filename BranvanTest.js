var React = require("react");
import {Button, Icon, Card, CardPanel,Collection,CollectionItem} from 'react-materialize';
var helpers = require("../utils/helpers");



var Branvan = React.createClass({
    getInitialState: function() {
        return {
            Name: "",
            group: "",
            allEmployees: [],
            selectedEmployee: "",
            emp_id: ""
        };
    },

    componentDidMount: function() {
        this.getEmployees();
    },


    getEmployees: function() {
        helpers.getAllEmployees().then(function(response) {
            if (response !== this.state.allEmployees) {
                this.setState({ allEmployees: response.data });
                this.activeButtons();
            }
        }.bind(this));
    },

    handleUserChange(event) {
       this.setState({ [event.target.name]: event.target.value});
    },

    handleAddForm: function(event) {
        event.preventDefault();
        helpers.addEmployee(this.state.Name, this.state.group).then(function(response) {
            this.state.emp_id = response.data._id;

            helpers.addEmpSchedule(this.state.emp_id, this.state.Name, this.state.group).then(function(response) {
                this.clearStates();
            }.bind(this));

        }.bind(this));
        Materialize.toast('Employee added', 3000);
        this.clearForm();
        this.getEmployees();
    },

    handlefetchCalendar: function(event) {
        event.preventDefault();
        helpers.updateCalendar()
        .then(function(response) {
            console.log("suceess", response)
            Materialize.toast('Calendar Fetched', 3000);
        }.bind(this));
    },




    handleUpdateForm: function(event) {
        event.preventDefault();
        helpers.updateEmployee(this.state.selectedEmployee, this.state.Name, this.state.group).then(function(response) {
        }.bind(this));

        helpers.updateEmpName(this.state.emp_id, this.state.Name).then(function(response) {
            this.clearStates();
        }.bind(this));
        Materialize.toast("Employee updated", 3000);
        this.clearForm();
        this.getEmployees();
   },

    handleRemoveForm: function(event) {
        event.preventDefault();
        helpers.removeEmployee(this.state.selectedEmployee).then(function(response) {
        }.bind(this));
        helpers.removeEmpSchedule(this.state.emp_id).then(function(response) {
            this.clearStates();
        }.bind(this));
        Materialize.toast("Employee removed", 3000);
        this.clearForm();
        this.getEmployees();
    },

    clickEmployee: function(event) {
        this.setState({selectedEmployee: event.target.id}, function() {
            for (var i = 0; i < this.state.allEmployees.length; i++) {
                if (this.state.allEmployees[i]._id == this.state.selectedEmployee) {
                    this.setState({
                        Name: this.state.allEmployees[i].Name,
                        group: this.state.allEmployees[i].group,
                        emp_id: this.state.selectedEmployee
                    });
                    this.activeButtons();
                }
            }
        });
    },

    newEmployee: function() {
        this.clearForm();
        this.clearStates();
        this.activeButtons();
    },

    clearForm: function() {
        var elements = document.getElementsByTagName("input");
        for (var i=0; i < elements.length; i++) {
            if ((elements[i].type == "text") || (elements[i].type == "number") || (elements[i].type == "email")) {
                elements[i].value = "";
                elements[i].classList.remove("valid");
            }
        };
        this.getEmployees();
    },

    clearStates: function() {
        this.setState({ Name: "", group: "", selectedEmployee: ""});
    },

    activeButtons: function() {
        // don't allow updating or removing on empty form
        if (this.state.selectedEmployee == "") {
            document.getElementById("addEmployee").className = "organizeTable btn btn-large waves-effect waves-light green accent-3";
            document.getElementById("updateEmployee").className += " disabled";
            document.getElementById("removeEmployee").className += " disabled";
        } else {
            document.getElementById("addEmployee").className += " disabled";
            document.getElementById("updateEmployee").className = "organizeTable btn btn-large waves-effect waves-light blue accent-3";
            document.getElementById("removeEmployee").className = "organizeTable btn btn-large waves-effect waves-light red accent-3";
        }
    },

    render: function() {
        return (
          /***
          This is an example list that we can implement. The uncommented code is some example styleing I made for this list.

          <ul>
            <li style= {{display: "listItem", listStyle: "disc"}}>Hour 2
              <ul>
                <li style= {{display: "listItem", listStyle: "circle", marginLeft: "25px"}}>:00</li>
                <ul>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 1</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 2</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 3</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 4</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 5</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 6</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 7</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 8</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 9</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 10</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 11</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 12</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 13</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 14</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 15</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 16</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 17</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 18</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 19</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 20</li>
                </ul>
                <li style= {{display: "listItem", listStyle: "circle", marginLeft: "25px"}}>:15</li>
                <ul>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 1</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 2</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 3</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 4</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 5</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 6</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 7</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 8</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 9</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 10</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 11</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 12</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 13</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 14</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 15</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 16</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 17</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 18</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 19</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 20</li>
                </ul>
                <li style= {{display: "listItem", listStyle: "circle", marginLeft: "25px"}}>:30</li>
                <ul>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 1</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 2</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 3</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 4</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 5</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 6</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 7</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 8</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 9</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 10</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 11</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 12</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 13</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 14</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 15</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 16</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 17</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 18</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 19</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 20</li>
                </ul>
                <li style= {{display: "listItem", listStyle: "circle", marginLeft: "25px"}}>:45</li>
                <ul>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 1</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 2</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 3</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 4</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 5</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 6</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 7</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 8</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 9</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 10</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 11</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 12</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 13</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 14</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 15</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 16</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 17</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 18</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 19</li>
                  <li style= {{display: "listItem", listStyle: "square", marginLeft: "50px"}}> person 20</li>
                </ul>
              </ul>
            </li>
          </ul>


          {To Do

            1) We need to write Javascript that can change the remaining persons count as well as the color plus the name for the appropriate spaces in each card
            when it is called upon


          **/


          <div style = {{ marginTop: "100"}}>
          {/***Code for Key **/}
          <div style={{backgroundColor: "#4F84C4", borderRadius: "12px", position: "realative", textAlign: "center", margin: "auto", width: "200px", outline: "0", border: "2px", borderColor:"black", borderStyle: "solid"}}>
            <p style={{color: "white"}}>Key</p>
            <Collection>
              <CollectionItem style={{backgroundColor: "#F7786B"}}><Icon small>account_circle</Icon>= reserved slot</CollectionItem>
              <CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>= available slot</CollectionItem>
            </Collection>
            <p style={{backgroundColor: "#4F84C4", color: "white", textAlign: "center", borderRadius: "0 0 12px 12px", width: "auto", height: "auto"}}>= Remaining spots in this timeslot</p>
          </div>


            <ul>
              <div className="row" style = {{marginTop: "20px", border: "1", borderColor:"#0074D9", borderStyle: "solid", borderRadius: "20px", padding:"10px"}}>
              <li className="CenterIcon" style = {{padding: "5px"}}><Icon medium>access_time</Icon>9:00am
                <ul>
                  <div className="col s1 m3">
                    <div class="card blue-grey darken-1" style={{backgroundColor: "#4F84C4", borderRadius: "12px"}}>
                      <li>
                        <div class="card-title" style={{paddingLeft: "10px", paddingTop: "8px", paddingBottom: "3px", color: "white"}}>:00</div></li>
                        <ul>
                          <div class="fixedHeight" style = {{ height: "250px", display: "block", clear: "both", postion: "absolute", overflow: "auto"}}>
                            <div class="card-content white-text teal lighten-2" style = {{position: "realative"}}>
                              <Collection>
                                <li><CollectionItem style={{backgroundColor: "#F7786B"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#F7786B"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                              </Collection>
                            </div>
                          </div>
                        </ul>
                        <li><p style={{backgroundColor: "#4F84C4", color: "white", textAlign: "center", borderRadius: "0 0 12px 12px", width: "auto", height: "auto"}}>18</p></li>
                      </div>
                    </div>
                    <div className="col s2 m3">
                      <div class="card blue-grey darken-1" style={{backgroundColor: "#4F84C4", borderRadius: "12px"}}>
                        <li>
                          <div class="card-title" style={{paddingLeft: "10px", paddingTop: "8px", paddingBottom: "3px", color: "white"}}>:15</div></li>
                          <ul>
                            <div class="fixedHeight" style = {{ height: "250px", display: "block", clear: "both", postion: "absolute", overflow: "auto"}}>
                              <div class="card-content white-text teal lighten-2" style = {{position: "realative"}}>
                                <Collection>
                                  <li><CollectionItem style={{backgroundColor: "#F7786B"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                </Collection>
                              </div>
                            </div>
                          </ul>
                          <li><p style={{backgroundColor: "#4F84C4", color: "white", textAlign: "center", borderRadius: "0 0 12px 12px", width: "auto", height: "auto"}}>19</p></li>
                        </div>
                      </div>
                      <div className="col s3 m3">
                        <div class="card blue-grey darken-1" style={{backgroundColor: "#4F84C4", borderRadius: "12px"}}>
                          <li>
                            <div class="card-title" style={{paddingLeft: "10px", paddingTop: "8px", paddingBottom: "3px", color: "white"}}>:30</div></li>
                            <ul>
                              <div class="fixedHeight" style = {{ height: "250px", display: "block", clear: "both", postion: "absolute", overflow: "auto"}}>
                                <div class="card-content white-text teal lighten-2" style = {{position: "realative"}}>
                                  <Collection>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  </Collection>
                                </div>
                              </div>
                            </ul>
                            <li><p style={{backgroundColor: "#4F84C4", color: "white", textAlign: "center", borderRadius: "0 0 12px 12px", width: "auto", height: "auto"}}>20</p></li>
                          </div>
                        </div>
                        <div className="col s4 m3">
                          <div class="card blue-grey darken-1" style={{backgroundColor: "#4F84C4", borderRadius: "12px"}}>
                            <li>
                              <div class="card-title" style={{paddingLeft: "10px", paddingTop: "8px", paddingBottom: "3px", color: "white"}}>:45</div></li>
                              <ul>
                                <div class="fixedHeight" style = {{ height: "250px", display: "block", clear: "both", postion: "absolute", overflow: "auto"}}>
                                  <div class="card-content white-text teal lighten-2" style = {{position: "realative"}}>
                                    <Collection>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    </Collection>
                                  </div>
                                </div>
                              </ul>
                              <li><p style={{backgroundColor: "#4F84C4", color: "white", textAlign: "center", borderRadius: "0 0 12px 12px", width: "auto", height: "auto"}}>20</p></li>
                            </div>
                          </div>
                  </ul>
                </li>
              </div>





              <div className="row" style = {{marginTop: "20px", border: "1", borderColor:"#0074D9", borderStyle: "solid", borderRadius: "20px", padding:"10px"}}>
              <li className="CenterIcon" style = {{padding: "5px"}}><Icon medium>access_time</Icon>10:00am
                <ul>
                  <div className="col s1 m3">
                    <div class="card blue-grey darken-1" style={{backgroundColor: "#4F84C4", borderRadius: "12px"}}>
                      <li>
                        <div class="card-title" style={{paddingLeft: "10px", paddingTop: "8px", paddingBottom: "3px", color: "white"}}>:00</div></li>
                        <ul>
                          <div class="fixedHeight" style = {{ height: "250px", display: "block", clear: "both", postion: "absolute", overflow: "auto"}}>
                            <div class="card-content white-text teal lighten-2" style = {{position: "realative"}}>
                              <Collection>
                                <li><CollectionItem style={{backgroundColor: "#F7786B"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#F7786B"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                              </Collection>
                            </div>
                          </div>
                        </ul>
                        <li><p style={{backgroundColor: "#4F84C4", color: "white", textAlign: "center", borderRadius: "0 0 12px 12px", width: "auto", height: "auto"}}>18</p></li>
                      </div>
                    </div>
                    <div className="col s2 m3">
                      <div class="card blue-grey darken-1" style={{backgroundColor: "#4F84C4", borderRadius: "12px"}}>
                        <li>
                          <div class="card-title" style={{paddingLeft: "10px", paddingTop: "8px", paddingBottom: "3px", color: "white"}}>:15</div></li>
                          <ul>
                            <div class="fixedHeight" style = {{ height: "250px", display: "block", clear: "both", postion: "absolute", overflow: "auto"}}>
                              <div class="card-content white-text teal lighten-2" style = {{position: "realative"}}>
                                <Collection>
                                  <li><CollectionItem style={{backgroundColor: "#F7786B"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                </Collection>
                              </div>
                            </div>
                          </ul>
                          <li><p style={{backgroundColor: "#4F84C4", color: "white", textAlign: "center", borderRadius: "0 0 12px 12px", width: "auto", height: "auto"}}>19</p></li>
                        </div>
                      </div>
                      <div className="col s3 m3">
                        <div class="card blue-grey darken-1" style={{backgroundColor: "#4F84C4", borderRadius: "12px"}}>
                          <li>
                            <div class="card-title" style={{paddingLeft: "10px", paddingTop: "8px", paddingBottom: "3px", color: "white"}}>:30</div></li>
                            <ul>
                              <div class="fixedHeight" style = {{ height: "250px", display: "block", clear: "both", postion: "absolute", overflow: "auto"}}>
                                <div class="card-content white-text teal lighten-2" style = {{position: "realative"}}>
                                  <Collection>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  </Collection>
                                </div>
                              </div>
                            </ul>
                            <li><p style={{backgroundColor: "#4F84C4", color: "white", textAlign: "center", borderRadius: "0 0 12px 12px", width: "auto", height: "auto"}}>20</p></li>
                          </div>
                        </div>
                        <div className="col s4 m3">
                          <div class="card blue-grey darken-1" style={{backgroundColor: "#4F84C4", borderRadius: "12px"}}>
                            <li>
                              <div class="card-title" style={{paddingLeft: "10px", paddingTop: "8px", paddingBottom: "3px", color: "white"}}>:45</div></li>
                              <ul>
                                <div class="fixedHeight" style = {{ height: "250px", display: "block", clear: "both", postion: "absolute", overflow: "auto"}}>
                                  <div class="card-content white-text teal lighten-2" style = {{position: "realative"}}>
                                    <Collection>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    </Collection>
                                  </div>
                                </div>
                              </ul>
                              <li><p style={{backgroundColor: "#4F84C4", color: "white", textAlign: "center", borderRadius: "0 0 12px 12px", width: "auto", height: "auto"}}>20</p></li>
                            </div>
                          </div>
                  </ul>
                </li>
              </div>





              <div className="row" style = {{marginTop: "20px", border: "1", borderColor:"#0074D9", borderStyle: "solid", borderRadius: "20px", padding:"10px"}}>
              <li className="CenterIcon" style = {{padding: "5px"}}><Icon medium>access_time</Icon>11:00am
                <ul>
                  <div className="col s1 m3">
                    <div class="card blue-grey darken-1" style={{backgroundColor: "#4F84C4", borderRadius: "12px"}}>
                      <li>
                        <div class="card-title" style={{paddingLeft: "10px", paddingTop: "8px", paddingBottom: "3px", color: "white"}}>:00</div></li>
                        <ul>
                          <div class="fixedHeight" style = {{ height: "250px", display: "block", clear: "both", postion: "absolute", overflow: "auto"}}>
                            <div class="card-content white-text teal lighten-2" style = {{position: "realative"}}>
                              <Collection>
                                <li><CollectionItem style={{backgroundColor: "#F7786B"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#F7786B"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                              </Collection>
                            </div>
                          </div>
                        </ul>
                        <li><p style={{backgroundColor: "#4F84C4", color: "white", textAlign: "center", borderRadius: "0 0 12px 12px", width: "auto", height: "auto"}}>18</p></li>
                      </div>
                    </div>
                    <div className="col s2 m3">
                      <div class="card blue-grey darken-1" style={{backgroundColor: "#4F84C4", borderRadius: "12px"}}>
                        <li>
                          <div class="card-title" style={{paddingLeft: "10px", paddingTop: "8px", paddingBottom: "3px", color: "white"}}>:15</div></li>
                          <ul>
                            <div class="fixedHeight" style = {{ height: "250px", display: "block", clear: "both", postion: "absolute", overflow: "auto"}}>
                              <div class="card-content white-text teal lighten-2" style = {{position: "realative"}}>
                                <Collection>
                                  <li><CollectionItem style={{backgroundColor: "#F7786B"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                </Collection>
                              </div>
                            </div>
                          </ul>
                          <li><p style={{backgroundColor: "#4F84C4", color: "white", textAlign: "center", borderRadius: "0 0 12px 12px", width: "auto", height: "auto"}}>19</p></li>
                        </div>
                      </div>
                      <div className="col s3 m3">
                        <div class="card blue-grey darken-1" style={{backgroundColor: "#4F84C4", borderRadius: "12px"}}>
                          <li>
                            <div class="card-title" style={{paddingLeft: "10px", paddingTop: "8px", paddingBottom: "3px", color: "white"}}>:30</div></li>
                            <ul>
                              <div class="fixedHeight" style = {{ height: "250px", display: "block", clear: "both", postion: "absolute", overflow: "auto"}}>
                                <div class="card-content white-text teal lighten-2" style = {{position: "realative"}}>
                                  <Collection>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                  </Collection>
                                </div>
                              </div>
                            </ul>
                            <li><p style={{backgroundColor: "#4F84C4", color: "white", textAlign: "center", borderRadius: "0 0 12px 12px", width: "auto", height: "auto"}}>20</p></li>
                          </div>
                        </div>
                        <div className="col s4 m3">
                          <div class="card blue-grey darken-1" style={{backgroundColor: "#4F84C4", borderRadius: "12px"}}>
                            <li>
                              <div class="card-title" style={{paddingLeft: "10px", paddingTop: "8px", paddingBottom: "3px", color: "white"}}>:45</div></li>
                              <ul>
                                <div class="fixedHeight" style = {{ height: "250px", display: "block", clear: "both", postion: "absolute", overflow: "auto"}}>
                                  <div class="card-content white-text teal lighten-2" style = {{position: "realative"}}>
                                    <Collection>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                      <li><CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem></li>
                                    </Collection>
                                  </div>
                                </div>
                              </ul>
                              <li><p style={{backgroundColor: "#4F84C4", color: "white", textAlign: "center", borderRadius: "0 0 12px 12px", width: "auto", height: "auto"}}>20</p></li>
                            </div>
                          </div>
                  </ul>
                </li>
              </div>
              </ul>



            //This Block of code below was a test for me to see what kind of styling I wanted to implement for the list that is commented code at the top of the render

          <div className="row" style = {{marginTop: "20px", border: "1", borderColor:"#0074D9", borderStyle: "solid", borderRadius: "20px", padding:"10px"}}>
              <div className="CenterIcon" style = {{padding: "5px"}}>
                <Icon medium>access_time</Icon>12:00pm
                </div>
                <div className="col s1 m3">
                  <div class="card blue-grey darken-1" style={{backgroundColor: "#4F84C4", borderRadius: "12px"}}>
                    <div class="card-title" style={{paddingLeft: "10px", paddingTop: "8px", paddingBottom: "3px", color: "white"}}>:00</div>
                    <div class="fixedHeight" style = {{ height: "250px", display: "block", clear: "both", postion: "absolute", overflow: "auto"}}>
                      <div class="card-content white-text teal lighten-2" style = {{position: "realative"}}>
                        <Collection>
                          <CollectionItem style={{backgroundColor: "#F7786B"}}><Icon small>account_circle</Icon>Alvin</CollectionItem>
                          <CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>A Fake Alvin</CollectionItem>
                          <CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>An Imposter named Alvin</CollectionItem>
                          <CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>A person not named Alvin</CollectionItem>
                          <CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>A test Alvin</CollectionItem>
                          <CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem>
                          <CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>A Fake Alvin</CollectionItem>
                          <CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>An Imposter named Alvin</CollectionItem>
                          <CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>A person not named Alvin</CollectionItem>
                          <CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>A test Alvin</CollectionItem>
                          <CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem>
                          <CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>A Fake Alvin</CollectionItem>
                          <CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>An Imposter named Alvin</CollectionItem>
                          <CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>A person not named Alvin</CollectionItem>
                          <CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>A test Alvin</CollectionItem>
                          <CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>Alvin</CollectionItem>
                          <CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>A Fake Alvin</CollectionItem>
                          <CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>An Imposter named Alvin</CollectionItem>
                          <CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>A person not named Alvin</CollectionItem>
                          <CollectionItem style={{backgroundColor: "#DCDCDC"}}><Icon small>account_circle</Icon>A test Alvin</CollectionItem>
                        </Collection>
                      </div>
                    </div>
                  <p style={{backgroundColor: "#4F84C4", color: "white", textAlign: "center", borderRadius: "0 0 12px 12px", width: "auto", height: "auto"}}>19</p>
                  </div>
                </div>
                <div className="col s2 m3">
                  <div class="card blue-grey darken-1">
                    <div class="card-content white-text teal lighten-2">
                      <span class="card-title">:15</span>
                      <Collection>
                        <CollectionItem><Icon small>account_circle</Icon>An Alvin cult</CollectionItem>
                        <CollectionItem><Icon small>account_circle</Icon>Alvin's sister</CollectionItem>
                        <CollectionItem><Icon small>account_circle</Icon>A pumpkin that wanted to be named Alvin</CollectionItem>
                        <CollectionItem><Icon small>account_circle</Icon>Alvin the meme</CollectionItem>
                      </Collection>
                    </div>
                  </div>
                </div>
                <div className="col s3 m3">
                  <div class="card blue-grey darken-1">
                    <div class="card-content white-text teal lighten-2">
                      <span class="card-title">:30</span>
                      <Collection>
                        <CollectionItem><Icon small>account_circle</Icon>The Only Alvin</CollectionItem>
                        <CollectionItem><Icon small>account_circle</Icon>Not Alvin</CollectionItem>
                        <CollectionItem><Icon small>account_circle</Icon>Maybe Alvin</CollectionItem>
                        <CollectionItem><Icon small>account_circle</Icon>Potentially Alvin</CollectionItem>
                      </Collection>
                    </div>
                  </div>
                </div>
                <div className="col s4 m3">
                  <div class="card blue-grey darken-1">
                    <div class="card-content white-text teal lighten-2">
                      <span class="card-title">:45</span>
                      <Collection>
                        <CollectionItem><Icon small>account_circle</Icon>Most Definitly Not Alvin</CollectionItem>
                        <CollectionItem><Icon small>account_circle</Icon>100% Not Alvin</CollectionItem>
                        <CollectionItem><Icon small>account_circle</Icon>Alvin's Cousin, not Alvin</CollectionItem>
                        <CollectionItem><Icon small>account_circle</Icon>A Different Alvin</CollectionItem>
                      </Collection>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        );
    }
});
