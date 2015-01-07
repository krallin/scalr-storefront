Scalr Storefront
================

POC.

Usage
-----

### How to Build

```shell
$ gulp build                    # or, `gulp build --release`
```

By default, it builds in debug mode. If you need to build in release mode, add
`--release` flag.

### How to Run

```shell
$ gulp                          # or, `gulp --release`
```

This will start a lightweight development server with LiveReload and
synchronized browsing across multiple devices and browsers.

### How to Deploy

```shell
$ gulp deploy                   # or, `gulp deploy --production`
```

You can deploy to different destinations by adding a corresponding flag.
For example `--production` or `--staging` etc. See the 'deploy' task in
`gulpfile.js`.

License
=======

Based on https://github.com/kriasoft/react-starter-kit (MIT).
