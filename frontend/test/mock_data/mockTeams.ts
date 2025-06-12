export const mockTeams = [
    {
        id: "test-team-1",
        name: "Cloud9 Elite",
        description: "Professional CS:GO team competing in major tournaments",
        clubId: "test-club-1",
        gameName: "Counter-Strike 2",
        admissionType: "closed",
        captainId: "test-user-1",
        nrMembers: 2,
        members: [
            {userId: "test-user-1", username: "ProPlayer1", isCaptain: true},
            {userId: "test-user-2", username: "AimMaster", isCaptain: false},
        ]
    },
    {
        id: "test-team-2",
        name: "League Legends",
        description: "Competitive League team for tournaments",
        clubId: "test-club-2",
        gameName: "League of Legends",
        admissionType: "invite_only",
        captainId: "test-user-6",
        nrMembers: 2,
        members: [
            {userId: "test-user-6", username: "MidLaner", isCaptain: true},
            {userId: "test-user-3", username: "mikewilson", isCaptain: false},
        ]
    },
    {
        id: "test-team-3",
        name: "Rocket Stars",
        clubId: "test-club-2",
        gameName: "Rocket League",
        admissionType: "open",
        captainId: "test-user-11",
        nrMembers: 3,
        members: [
            {userId: "test-user-11", username: "Aerial", isCaptain: true},
            {userId: "test-user-3", username: "mikewilson", isCaptain: false},
            {userId: "user-013", username: "Striker", isCaptain: false}
        ]
    }
];