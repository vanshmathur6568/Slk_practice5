let currentUser = null;
let data = null;

// Fetch data from JSON file
async function fetchData() {
    try {
        const response = await fetch('data.json');
        data = await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Initialize the app
async function init() {
    await fetchData();
    showPage('login-page');
}
init();

// Show specific page
function showPage(pageId) {
    const pages = ['login-page', 'register-page', 'welcome-page', 'profile-page', 'timetable-page', 'activity-page', 'extra-activity-page'];
    pages.forEach(page => {
        document.getElementById(page).style.display = (page === pageId) ? 'block' : 'none';
    });

    // Show student name on header if logged in
    if (currentUser) {
        document.getElementById('student-name').textContent = `Welcome, ${currentUser.username}`;
        document.getElementById('student-name').style.display = 'block';
        document.getElementById('welcome-page-link').style.display = 'block';
        document.getElementById('profile-page-link').style.display = 'block';
        document.getElementById('timetable-page-link').style.display = 'block';
        document.getElementById('activity-page-link').style.display = 'block';
        document.getElementById('extra-activity-page-link').style.display = 'block';
        document.getElementById('login-page-link').style.display = 'none';
        document.getElementById('register-page-link').style.display = 'none';
    } else {
        document.getElementById('student-name').style.display = 'none';
        document.getElementById('welcome-page-link').style.display = 'none';
        document.getElementById('profile-page-link').style.display = 'none';
        document.getElementById('timetable-page-link').style.display = 'none';
        document.getElementById('activity-page-link').style.display = 'none';
        document.getElementById('extra-activity-page-link').style.display = 'none';
        document.getElementById('login-page-link').style.display = 'block';
        document.getElementById('register-page-link').style.display = 'block';
    }
}

// Handle login
async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = data.users.find(user => user.username === username && user.password === password);
    if (user) {
        currentUser = user;
        showPage('welcome-page');
        updateWelcomePage();
    } else {
        alert('Invalid username or password');
    }
}

// Handle registration
async function register() {
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;

    if (data.users.some(user => user.username === username)) {
        alert('Username already exists');
    } else {
        data.users.push({ username, password });
        alert('Registration successful. Please log in.');
        showPage('login-page');
    }
}

// Display student information on the profile page
function displayStudentInfo() {
    if (currentUser) {
        const studentInfo = `
            Name: ${currentUser.username}<br>
            Age: 16<br>
            Grade: 10th<br>
            Subjects: Math, Science, English
        `;
        document.getElementById('student-info').innerHTML = studentInfo;
    }
}

// Update the Welcome page with extra activities
function updateWelcomePage() {
    if (currentUser) {
        const extraActivitiesList = document.getElementById('extra-activities-list');
        extraActivitiesList.innerHTML = '';
        data.Extra_Activity.forEach(activity => {
            const activityItem = document.createElement('div');
            activityItem.textContent = `${activity.date}: ${activity.activity} (${activity.Subject})`;
            extraActivitiesList.appendChild(activityItem);
        });
    }
}

// Show Monthly Activities page
function showActivityPage() {
    showPage('activity-page');
    updateMonthlyActivities();
}

// Show Extra Activity page
function showExtraActivityPage() {
    showPage('extra-activity-page');
}

// Submit extra activity
function submitExtraActivity() {
    const date = document.getElementById('activity-date').value;
    const activityDescription = document.getElementById('extra-activity').value;
    const subject = document.getElementById('activity-subject').value;

    if (currentUser && date && activityDescription && subject) {
        data.Extra_Activity.push({
            id: data.Extra_Activity.length + 1,
            date,
            activity: activityDescription,
            Subject: subject
        });
        alert('Activity added successfully');
        updateWelcomePage();
        showPage('welcome-page');
    } else {
        alert('Please fill in all fields');
    }
}

// Update Monthly Activities
function updateMonthlyActivities() {
    const activityList = document.getElementById('activity-list');
    activityList.innerHTML = '';
    data.Activities.forEach(activity => {
        const activityItem = document.createElement('li');
        activityItem.textContent = `${activity.activity} (${activity.subject})`;
        activityList.appendChild(activityItem);
    });
}

// Event listeners
document.getElementById('login-page-link').addEventListener('click', () => showPage('login-page'));
document.getElementById('register-page-link').addEventListener('click', () => showPage('register-page'));
document.getElementById('welcome-page-link').addEventListener('click', () => showPage('welcome-page'));
document.getElementById('profile-page-link').addEventListener('click', () => {
    showPage('profile-page');
    displayStudentInfo();
});
document.getElementById('timetable-page-link').addEventListener('click', () => showPage('timetable-page'));
document.getElementById('activity-page-link').addEventListener('click', () => showPage('activity-page'));
document.getElementById('extra-activity-page-link').addEventListener('click', () => showPage('extra-activity-page'));
