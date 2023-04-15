import React, { useState, useEffect } from 'react';

const GitHubUpdates = () => {
  const [commits, setCommits] = useState([]);

  useEffect(() => {
    fetch('https://api.github.com/repos/kchannn13/LinkedUp/commits?per_page=1')
      .then(response => response.json())
      .then(data => {
        setCommits(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h2>Latest commit:</h2>
      <ul>
        {commits.map(commit => (
          <li key={commit.sha}>
            <strong>{commit.commit.author.name}</strong>: {commit.commit.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GitHubUpdates;