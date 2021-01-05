local monitors = { peripheral.find("monitor") } 


-- All Monitor Loop
for i = 1, 
  m = monitors[i]
  m.setTextColor(colors.white)
  m.clear()
  m.write("[Connected!]")
end
