// --- 1. SAVE HABIT FUNCTION ---
function saveHabit(name, time) {
    // Get existing habits from storage or start an empty list
    let habits = JSON.parse(localStorage.getItem('myHabits')) || [];
    
    // Create the new habit object
    const newHabit = {
        name: name,
        time: time || "ANYTIME",
        streak: 0
    };

    // Add to the list and save back to storage
    habits.push(newHabit);
    localStorage.setItem('myHabits', JSON.stringify(habits));
    
    alert("Habit added successfully!");
    window.location.href = 'index.html'; // Go to dashboard
}

// --- 2. HANDLE "CREATE CUSTOM" FORM ---
const habitForm = document.getElementById('habit-form');
if (habitForm) {
    habitForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('habit-name').value;
        const time = document.getElementById('habit-time').value;
        saveHabit(name, time);
    });
}

// --- 3. HANDLE LIBRARY "ADD" BUTTONS ---
// This finds all buttons with class "add"
const addButtons = document.querySelectorAll('.add');
addButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Find the title of the habit inside the card
        const habitName = this.parentElement.querySelector('h3').innerText;
        saveHabit(habitName, "ANYTIME");
    });
});

// --- 4. DISPLAY HABITS ON DASHBOARD ---
const habitsContainer = document.querySelector('.habits');
if (habitsContainer && window.location.pathname.includes('index.html')) {
    const savedHabits = JSON.parse(localStorage.getItem('myHabits')) || [];
    
    savedHabits.forEach(habit => {
        const habitHTML = `
            <div class="card">
                <div class="card-text">
                    <time>${habit.time}</time>
                    <h3>${habit.name}</h3>
                    <small>${habit.streak} day streak 🔥</small>
                </div>
                <button class="check-btn"></button>
            </div>
        `;
        habitsContainer.innerHTML += habitHTML;
    });
}