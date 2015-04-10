# Contributing

## Git Workflow

1. Create an issue
  - Use github to create the issue
  - Add labels that apply to your issue
  - Add a nightly milestone (reviewed at 7:30pm)
2. Working on an issue
  - Create a branch that refernces the issue id you are working on
  ```bash
  git checkout -b crewapp/crewapp#40
  ```
  - Push your branch to github so waffle.io knows you are working on it
  ```bash
  git push origin crewapp/crewapp#40
  ```
  - NOTE: you might need to escape `#`
3. Making commits to your feature branch
  - Write a commit message that describes what the commit is doing
  - Once you feel a commit has fixed an issue, use one of these keywords in your commit message, and include issue number `#40`
  ```
  keywords
  --------
  close, closes, closed
  fix, fixes, fixed
  resolve, resolves, resolved
  ```
  - An example of how this would word:
  ```bash
  git commit -m "closes #40: added chat user"
  # or #
  git commit -m "closes #40"
  ```
4. Making pull requests
  - When you're finished with your fix or feature, rebase upstream changes into your branch. Submit a pull request directly to master.
  - Include a description of your changes.
  - The title of your pull request should have the same message as your commit with they keyword above.
5. Review
  - Your pull request will be reviewed by two other maintainers. The point of code reviews is to help keep the codebase clean and of high quality and, equally as important, to help you grow as a programmer. If your code reviewer requests that you make change that you don't understand, ask them why.
  - Fix any issues raised by your code reviwer and push your fixes as a single new commit.
  - Once the pull request has been reviewed, it will be merged by another member of the team. Do not merge your own commits.
6. Post-Merge
  - If you pull request was merged, you should delete the branch on local and remote
    - Local Delete
    ```bash
    git branch -D crewapp/crewapp#40
    ```
    - Remote Delete
    ```bash
    git push origin --delete crewapp/crewapp#40
    ```
    
## Reporting a bug

1. Create an issue
  - Use github to create the issue
  - Add labels that apply to the bug
  - Format your bug issue using the following section headers:
  ```
  bug issue section headers
  -------------------------
  - Explain the bug
  - Steps to reproduce
  - Expected results
  - Actual results
  - Technologies used
  - Screenshots*
  - Error logs
  ```
  *Screenshots are optional but recommended.

2. Add appropriate detail to each section. For an example bug report please see: [Example bug issue](https://github.com/crewapp/crewapp/issues/61)
