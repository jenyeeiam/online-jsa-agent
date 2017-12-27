import React from 'react'
import PropTypes from 'prop-types'

const InfoPage = () => {
  return (
    <div className="login-register">
      <h3>Who are we?</h3>
      <p className="info">Nippon Softball was created as a method of communication between foreign players and Japanese coaches. The Japanese Professional League consists of 12 teams where some choose to have up to 2 foreign players. Traditionally, teams or players choose to hire an agent, but we are trying to speed up that process.</p>
      <h3>How does it work?</h3>
      <p className="info">Any player that is interested in playing in Japan is encouraged to sign up and create a profile. Japanese teams are always looking for new players because foreign players generally only stay for 1-2 years. It is a big commitment on behalf of the player where the season runs from February to November, so often it is difficult for teams to find players who are interested and available to play.</p>
      <h3>How are the messages translated?</h3>
      <p className="info">All translations are provided by Bing Translate. Yes, we realize they are not perfect, but the messages are intended as a first introduction between parties. If the team and player are mutually interested, we will provide an interpreter to conduct more intensive communication.</p>
      <h3>{"Why aren't players' and coaches' names included?"}</h3>
      <p className="info">Names are not included to provide objectivity between players and coaches. Players are evaluated solely on the merits and accolades provided.</p>
    </div>
  )
}

export default InfoPage;
