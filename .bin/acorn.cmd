@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\@commitlint\load\node_modules\acorn\bin\acorn" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\..\@commitlint\load\node_modules\acorn\bin\acorn" %*
)