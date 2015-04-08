# Contributing

## General Workflow

1. Create an issue
  - Use github to create the issue
  - Add labels that apply to your issue
  - Add two milestones
    - A major milestone
    - A nightly milestone
2. Working on an issue
  - Create a branch that refernces the issue id you are working on
  ```bash
  git checkout -b crewapp/crewapp#40
  ```
  - Push your branch to github so waffle.io knows you are working on it
  ```bash
  git push origin crewapp/crewapp#40
  ```
3. Making commits to your feature branch.
  - Write a commit message that describes what the commit is doing
  - Once you feel a commit has fixed an issue, use one of these keywords in your commit message, and include `#40`
    - close, closes, closed
    - fix, fixes, fixed
    - resolve, resolves, resolved
  An example of how this would word:
  ```bash
  git commit -m "closes #40: added chat user"
  # or #
  git commit -m "closes #40"
  ```
4. Making pull requests
  - When you've finished with your fix or feature, Rebase upstream changes into your branch. Submit a pull request directly to master.
  - Include a description of your changes.
  - In the title of the pull request, it should be the same as message as your commit with they keyword above.
5. Review
  - Your pull request will be reviewed by two other maintainer. The point of code reviews is to help keep the codebase clean and of high quality and, equally as important, to help you grow as a programmer. If your code reviewer requests you make a change you don't understand, ask them why.
  - Fix any issues raised by your code reviwer, and push your fixes as a single new commit.
  - Once the pull request has been reviewed, it will be merged by another member of the team. Do not merge your own commits.
6. Post-Merge
  If you pull request was merged, you should delete the branch on local and remote
  Local Delete
  ```bash
  git branch -D crewapp/crewapp#40
  ```
  Remote Delete
  ```bash
  git push origin --delete crewapp/crewapp#40
  ```

### Make a pull request

Make a clear pull request from your fork and branch to the upstream master branch, detailing exactly what changes you made and what feature this should add. The clearer your pull request is the faster you can get your changes incorporated into this repo.

At least one other person MUST give your changes a code review, and once they are satisfied they will merge your changes into upstream. Alternatively, they may have some requested changes. You should make more commits to your branch to fix these, then follow this process again from rebasing onwards.

Once you get back here, make a comment requesting further review and
someone will look at your code again. If they like it, it will get merged,
else, just repeat again.

Thanks for contributing!

### Guidelines

1. Uphold the current code standard:
    - Keep your code DRY.
    - Follow [STYLE-GUIDE.md](STYLE-GUIDE.md)
1. Run the tests before submitting a pull request.
1. Tests are very, very important. Submit tests if your pull request contains new, testable behavior.