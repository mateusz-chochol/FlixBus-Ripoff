Push-Location $PSScriptRoot

try {
  Write-Output "`nBuilding project`n"
  npm run build

  Write-Output "`nDeploying to firebase`n"
  firebase deploy
}
finally {
  Pop-Location
}
