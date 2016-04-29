# clipkit - clipboard sync utilities

## Install

```
npm install -g clipkit
```

## Usage

```sh
# in .bash_profile etc.
export CLIPKIT_SERVER_PORT=3000
export CLIPKIT_SSH_TUNNELING_REMOTE_PORT=50000
export CLIPKIT_SERVER_SECRET=some_secret_string # optional for more safety

# on local
clipkit server
$(clipkit ssh-tunneling)

# on remote
echo -n "clipkit" | clipkit copy
```

## Advanced Usages

### With [tmux-yank](https://github.com/tmux-plugins/tmux-yank) on remote tmux

```
set -g @custom_copy_command 'clipkit copy'
```
