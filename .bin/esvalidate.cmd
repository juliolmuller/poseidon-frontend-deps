@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\@istanbuljs\load-nyc-config\node_modules\esprima\bin\esvalidate.js" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\..\@istanbuljs\load-nyc-config\node_modules\esprima\bin\esvalidate.js" %*
)