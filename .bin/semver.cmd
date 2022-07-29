@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\@babel\preset-env\node_modules\babel-plugin-polyfill-corejs3\node_modules\semver\bin\semver.js" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\..\@babel\preset-env\node_modules\babel-plugin-polyfill-corejs3\node_modules\semver\bin\semver.js" %*
)