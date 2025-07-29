document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("serch-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.querySelector(".easy-label");
    const mediumLabel = document.querySelector(".medium-label");
    const hardLabel = document.querySelector(".hard-label");

    const cardStatsContainer = document.querySelector(" .stats-cards");


    //return true or false based on regex

    function validateusername(username) {
        if (username.trim() === "") {
            alert("username should not be empty");
            return false;
        }

        const regex = /^(?![_-])[a-zA-Z0-9_-]{4,16}$/;
        ;
        const isMatching = regex.test(username);
        if (!isMatching) {
            alert("invalid username");
        }

        return isMatching;

    }

    async function fetchuserdetail(username) {
        try {
            searchButton.textContent = "searching.....";
            searchButton.disabled = true;
            const url = `https://leetcode-mock.free.beeceptor.com/`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Unable to fetch userData");
            }
            const data = await response.json();
            console.log("logging data: ", data);

            // Update progress circles and labels
            // Easy
            if (easyProgressCircle && document.getElementById("easy-label")) {
                easyProgressCircle.style.setProperty('--progress-degree', `${(data.easySolved / data.totalEasy) * 100}%`);
                document.getElementById("easy-label").textContent = `${data.easySolved} / ${data.totalEasy}`;
            }
            // Medium
            if (document.querySelector(".Medium-progress") && document.getElementById("Medium-label")) {
                document.querySelector(".Medium-progress").style.setProperty('--progress-degree', `${(data.mediumSolved / data.totalMedium) * 100}%`);
                document.getElementById("Medium-label").textContent = `${data.mediumSolved} / ${data.totalMedium}`;
            }
            // Hard
            if (document.querySelector(".Hard-progress") && document.getElementById("hard-label")) {
                document.querySelector(".Hard-progress").style.setProperty('--progress-degree', `${(data.hardSolved / data.totalHard) * 100}%`);
                document.getElementById("hard-label").textContent = `${data.hardSolved} / ${data.totalHard}`;
            }

            // Update stats card
            const statsCard = document.querySelector('.stats-card');
            if (statsCard) {
                statsCard.innerHTML = `
                    <h2>${data.username || username}</h2>
                    <p><strong>Total Solved:</strong> ${data.totalSolved} / ${data.totalQuestions}</p>
                    <p><strong>Ranking:</strong> ${data.ranking || 'N/A'}</p>
                    <p><strong>Contribution Points:</strong> ${data.contributionPoints || 'N/A'}</p>
                    <p><strong>Reputation:</strong> ${data.reputation || 'N/A'}</p>
                    <p><strong>Submission Accepted:</strong> ${data.acceptanceRate || 'N/A'}%</p>
                `;
            }
        }
        catch (error) {
            console.error("Error fetching user details:", error);
            const statsCard = document.querySelector('.stats-card');
            if (statsCard) {
                statsCard.innerHTML = `<p style="color:red;">User not found or API error.</p>`;
            }
        }
        finally {
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }

    searchButton.addEventListener('click', function () {
        const username = usernameInput.value;
        console.log("logging username", username);
        if (validateusername(username)) {
            fetchuserdetail(username);
        }
    });
})