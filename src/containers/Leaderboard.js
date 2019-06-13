/* (C) Copyright 2019 Hewlett Packard Enterprise Development LP. */
import React, { Component } from 'react';
import { Box, Text } from 'grommet';
import { Config } from '../config';
import { StyledImage } from '../components/Shared/style';
import { LeaderboardLayout } from '../components/Leaderboard/style';

export default class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hiScores: [],
      ranks: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'],
      colors: ['#FFFFFF', '#FFAA15', '#FD6FFF', '#9060EB', '#A2423D', '#FF4040', '#00739D', '#00C781', '#2AD2C9', '#777777'],
    };
  }

  componentDidMount() {
    fetch(`${Config.apiUrl}/user/leaderboard`)
      .then(res => res.json())
      .then((data) => {
        const sortedHiScores = data.sort((a, b) => b.score - a.score);
        const hiScores = sortedHiScores.slice(0, 10);
        this.setState({ hiScores });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { hiScores, ranks, colors } = this.state;
    return (
      <LeaderboardLayout
        justify="between"
        className="leaderboard-container"
        background="#000000"
        direction="column"
        pad={
          {
            top: 'large', bottom: 'none', left: 'large', right: 'large',
          }}
      >
        {/* HackShack Attack title and HighScore text */}
        <Box align="center">
          <Box>
            <StyledImage src="../img/hackshackattack.png" />
          </Box>
          <Box margin={{ top: 'large', bottom: 'xlarge' }}>
            <Text className="highscore-title">High Scores</Text>
          </Box>
        </Box>
        {/* Rank/Name/Score columns */}
        <Box
          className="highscore-container"
          direction="row"
        >
          <Box
            align="start"
            basis="1/3"
            direction="column"
            className="rank-column"
          >
            <Text color="dark-3" className="highscore-text">Rank</Text>
            {ranks.map((rank, index) => <Text key={index} margin={{ top: 'large', bottom: 'medium' }} color={colors[index]} className="highscore-text">{rank}</Text>)}
          </Box>
          <Box
            align="start"
            basis="1/2"
            direction="column"
            className="name-column"
          >
            <Text color="dark-3" className="highscore-text">Name</Text>
            {hiScores.map((hiScore, index) => <Text key={index} margin={{ top: 'large', bottom: 'medium' }} color={colors[index]} className="highscore-text">{hiScore.name}</Text>)}
          </Box>
          <Box
            align="end"
            basis="1/3"
            direction="column"
            className="score-column"
          >
            <Text color="dark-3" className="highscore-text">Score</Text>
            {hiScores.map((hiScore, index) => <Text key={index} margin={{ top: 'large', bottom: 'medium' }} color={colors[index]} className="highscore-text">{hiScore.score}</Text>)}
          </Box>
        </Box>
        {/* ItMonster image */}
        <Box alignSelf="end" margin={{ top: 'large' }} width="large">
          <StyledImage src="./img/itmonster.png" />
        </Box>
      </LeaderboardLayout>
    );
  }
}