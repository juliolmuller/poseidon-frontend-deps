@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\ast-transform\node_modules\escodegen\bin\esgenerate.js" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\..\ast-transform\node_modules\escodegen\bin\esgenerate.js" %*
)