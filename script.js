const liveMatches = [
  {
    home: "Manchester City",
    away: "Arsenal",
    score: "2 - 1",
    status: "DEMO • 65'"
  },
  {
    home: "Real Madrid",
    away: "Barcelona",
    score: "1 - 1",
    status: "DEMO • 72'"
  }
];

const upcomingMatches = [
  {
    home: "Liverpool",
    away: "Chelsea",
    date: "Sample fixture"
  },
  {
    home: "Bayern Munich",
    away: "Dortmund",
    date: "Sample fixture"
  }
];

const leagues = {
  premier: [
    ["Arsenal", 10, 25],
    ["Manchester City", 10, 23],
    ["Liverpool", 10, 22],
    ["Chelsea", 10, 18]
  ],
  laliga: [
    ["Real Madrid", 10, 27],
    ["Barcelona", 10, 25],
    ["Atletico Madrid", 10, 21],
    ["Sevilla", 10, 16]
  ],
  ucl: [
    ["Real Madrid", 6, 16],
    ["Bayern Munich", 6, 15],
    ["Liverpool", 6, 14],
    ["PSG", 6, 12]
  ]
};

function displayMatches(matches, containerId, isLive) {
  const container = document.getElementById(containerId);

  container.innerHTML = matches.map(match => `
    <article class="match-card">
      <h3>${match.home} vs ${match.away}</h3>
      ${
        isLive
          ? `<p class="score">${match.score}</p>
             <p class="status">${match.status}</p>`
          : `<p>${match.date}</p>`
      }
    </article>
  `).join("");
}

function displayStandings() {
  const league = document.getElementById("league").value;
  const tbody = document.getElementById("standings-body");

  tbody.innerHTML = leagues[league].map((team, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${team[0]}</td>
      <td>${team[1]}</td>
      <td>${team[2]}</td>
    </tr>
  `).join("");
}

document.getElementById("league").addEventListener(
  "change",
  displayStandings
);

displayMatches(liveMatches, "live-matches", true);
displayMatches(upcomingMatches, "upcoming-matches", false);
displayStandings();
