/**
 * Created by Vincent Peybernes on 04/10/2014.
 */

;(function(window){

	document.addEventListener('DOMContentLoaded', init);

	var template, droppable, uid;

	function init(){
		template = document.getElementById("template").innerHTML;
		uid = 0;

		bindEvents();
	}

	function bindEvents(){

		// New ticket
		document.querySelector(".ticket.new").addEventListener("click", function(e){
			this.insertAdjacentHTML("beforebegin", template);
			var ticket = this.parentNode.querySelector('.ticket.create');
			draggableize(ticket);
			saveTicket(ticket);
		});

		// Drag & Drop
		var draggable = document.querySelectorAll('[draggable="true"]');
		for(var i = 0; i < draggable.length; i++){
			draggableize(draggable[i]);
		}

		var dropzones = document.querySelectorAll('[dropzone="move"]');
		for(var i = 0; i < dropzones.length; i++) {
			dropzones[i].addEventListener("drop", function (event) {
				this.insertAdjacentHTML("beforeend", event.dataTransfer.getData("text/html"));
				var ticket = this.querySelector(".droppable");
				draggableize(ticket);
				saveTicket(ticket);

			});

			dropzones[i].addEventListener("dragover", function(event){
				event.preventDefault();
				droppable = true;
			})
			dropzones[i].addEventListener("dragenter",function(){
				this.style.backgroundColor = "#F0FFF0";
			});
			dropzones[i].addEventListener("dragleave",function(){
				this.style.backgroundColor = "transparent";
				droppable = false;
			});
		}
	}

	function draggableize(ticket){
		ticket.addEventListener("dragstart", function(event){
			event.dataTransfer.effectAllowed = "move";
			event.target.classList.add("droppable");
			event.dataTransfer.setData("text/html", event.target.outerHTML);
			event.target.classList.remove("droppable");
		});
		ticket.addEventListener("dragend", function(event){
			if(droppable) event.target.parentNode.removeChild(event.target);
		});

		ticket.classList.remove("create");
		ticket.classList.remove("droppable");
	}

	function createTicket(element, position) {
		uid++;
		var id = "ticket" + uid;

		switch (position) {
			case "before":
				element.insertAdjacentHTML("beforebegin", template);
				break;
			case "after":
				element.insertAdjacentHTML("afterend", template);
				break;
			default :
				element.insertAdjacentHTML("beforeend", template);
		}

		var ticket = document.querySelector(".ticket.create");
		draggableize(ticket);

		return ticket;
	}

	function saveTicket(ticket){
		console.log(ticket)
	}

	// API
	window.kanban = {
		saveTicket: saveTicket
	}

})(window);