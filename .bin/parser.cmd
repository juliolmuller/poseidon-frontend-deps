@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\@babel\core\node_modules\@babel\parser\bin\babel-parser.js" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\..\@babel\core\node_modules\@babel\parser\bin\babel-parser.js" %*
)