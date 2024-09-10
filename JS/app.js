const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Function to add a task to the list
function addTask() {
	// Check if the input box is empty
	if (inputBox.value === "") {
		// Display an alert for an empty value
		alert("You must write something");
	} else {
		// Create a new list item and set its innerHTML to the input value
		let li = document.createElement("li");
		li.innerHTML = inputBox.value;

		// Create a cross icon (span) and append it to the list item
		let span = document.createElement("span");
		span.innerHTML = "\u00d7"; // Unicode for '×'
		span.className = "remove-task"; // Add a class for styling

		// Add click event listener to mark/unmark the task as completed
		li.addEventListener("click", function () {
			li.classList.toggle("checked");
			saveData();
		});

		// Add click event listener to remove the task
		span.addEventListener("click", function (event) {
			event.stopPropagation(); // Prevent triggering the li click event
			li.remove();
			saveData();
		});

		// Append the span (cross mark) to the list item
		li.appendChild(span);

		// Append the list item to the list container
		listContainer.appendChild(li);

		// Clear the input box after adding a value
		inputBox.value = "";
		// Save the updated data
		saveData();
	}
}

// Function to save the data in local storage
function saveData() {
	localStorage.setItem("data", listContainer.innerHTML);
}

// Function to display the saved tasks
function showTask() {
	listContainer.innerHTML = localStorage.getItem("data");
	// Re-attach event listeners to the dynamically created list items
	const listItems = listContainer.querySelectorAll("li");
	listItems.forEach((li) => {
		li.addEventListener("click", function () {
			li.classList.toggle("checked");
			saveData();
		});
		li.querySelector("span").addEventListener("click", function (event) {
			event.stopPropagation();
			li.remove();
			saveData();
		});
	});
}
showTask();
