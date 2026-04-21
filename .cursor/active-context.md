> **BrainSync Context Pumper** 🧠
> Dynamically loaded for active file: `deno.json` (Domain: **Config/Infrastructure**)

### 🔴 Config/Infrastructure Gotchas
- **gotcha in shared-context.json**: -     }
+     },
-   ]
+     {
- }
+       "id": "d009a65695dc4cc2",
+       "ts": "2026-04-21T14:51:25.574Z",
+       "by": "hudav",
+       "data": "5u7zcPIcnJ7B5AI66855/LnzMVQMCFPrKnzcRTd01jeyQpKzfO6SywDW5g6kEoVjUBAfocFRgnR+fc7i/cqc7We5kCx9OB2pAwJTuUXhUkUTYiicNLE5rQwuG4m2EOuBnUA8u9GkjkcZfUhkwXh/3YV8+hlaGXJxLrTULEBaZOxsfKyzdeE/UVWH2g0YCFg+FKGoUcFJ38RS8wpWg1rdKDcOaQg33PcoqCdAcaWoSDP9lxF3Kp8Y1YbF5mZ8weVLvn/VXH5XoAXJeq+c6hFlThK7OK25C9e8m7Fb6WmyJg1jhagspqeH+qd/0Pno/FP0q4lKYL6puS11GXHS7/74yrlqcgzKN0L/PixhqHylxJKCdLNVpfmURk7Q+3L4Q19Q6grjCierPdtlDZwHOU9v/dgFvPSXPXEnwLz6T96WCNdDzQTTS5ry8tiPf7xTAiKBzjkcF2MmF4ZzDKBrvFpGTIjl1pvfS7+P7ntYKyYj1sw33l28CiqXjC7GsZktw8xVKWDaYz04uIldmy/BcuPn9Zcw7qyhhH/VPmOgV01FIAZE4Pazw0A431tcOkUEpdu+JsZ+479n+a4Co+Maue7bcQSBthQck36kZhU6DBNV+IJkaby0w7qIcDw57+QHO0C0hGyyFghfcTVlUlXb/N4NyaxfMfuUkeg5tWTRbOSWEirtZaVJa9v5a16hEicIQbveA7za2cuTLRw4Q3VaMhHBfWaeXT6CUtoDPFpr1LpyKHnKxwkAodZ0UKQAvf3koGZNPYnDRYZQbjdLu1GKsyzRBU4usJIPc1yPBbp+l6YvyvmbVtX0hVTyqb1DvmjfI/FaVFHAru/pmTikPbTeXa7FqKZd6LVJczDhiDvgfeqQAa1K1bBuGsw3FHYrQjVoOgY9ICN0SuSnXMjCjgWnJvau7cblxSfpcwCAWJwrYawlvY6FQ/LCr2w02FG/C8Z6z2RSK8tUlnkVS8jqVfx+l448gpUe6VSu2ooj3SvP+Nk38t8cfKfktQC9VkxRVYpDS0NyPGE3lKaaPeWORQJdW6mYhpLEVJi6NRM64Uaa3AQq9OXDOgLV9MHtfbz8nEIPWHhuzTAYiEF6UQkaFpwJVOWN5MjABEtAOl3ZjjIiGE6YUvOsKCZXgnhNSF3DYJfzCcTK1AgXs/nLbFPC"
+     }
+   ]
+ }

📌 IDE AST Context: Modified symbols likely include [v, entries]

### 📐 Config/Infrastructure Conventions & Fixes
- **[convention] Updated schema DLDl — hardens HTTP security headers — confirmed 3x**: -     "npm:@prisma/client@6.4.1": "6.4.1_prisma@6.4.1",
+     "npm:pg@*": "8.13.3",
-     "npm:pg@*": "8.13.3",
+     "npm:pg@8.13.3": "8.13.3",
-     "npm:pg@8.13.3": "8.13.3",
+     "npm:prisma@*": "6.4.1",
-     "npm:prisma@*": "6.4.1",
+     "npm:prisma@6.4.1": "6.4.1"
-     "npm:prisma@6.4.1": "6.4.1"
+   },
-   },
+   "jsr": {
-   "jsr": {
+     "@luca/esbuild-deno-loader@0.11.0": {
-     "@luca/esbuild-deno-loader@0.11.0": {
+       "integrity": "c05a989aa7c4ee6992a27be5f15cfc5be12834cab7ff84cabb47313737c51a2c",
-       "integrity": "c05a989aa7c4ee6992a27be5f15cfc5be12834cab7ff84cabb47313737c51a2c",
+       "dependencies": [
-       "dependencies": [
+         "jsr:@std/bytes",
-         "jsr:@std/bytes",
+         "jsr:@std/encoding",
-         "jsr:@std/encoding",
+         "jsr:@std/path"
-         "jsr:@std/path"
+       ]
-       ]
+     },
-     },
+     "@std/bytes@1.0.6": {
-     "@std/bytes@1.0.6": {
+       "integrity": "f6ac6adbd8ccd99314045f5703e23af0a68d7f7e58364b47d2c7f408aeb5820a"
-       "integrity": "f6ac6adbd8ccd99314045f5703e23af0a68d7f7e58364b47d2c7f408aeb5820a"
+     },
-     },
+     "@std/encoding@1.0.10": {
-     "@std/encoding@1.0.10": {
+       "integrity": "8783c6384a2d13abd5e9e87a7ae0520a30e9f56aeeaa3bdf910a3eaaf5c811a1"
-       "integrity": "8783c6384a2d13abd5e9e87a7ae0520a30e9f56aeeaa3bdf910a3eaaf5c811a1"
+     },
-     },
+     "@std/internal@1.0.12": {
-     "@std/internal@1.0.12": {
+       "integrity": "972a634fd5bc34b242024402972cd5143eac68d8dffaca5eaa4dba30ce17b027"
-       "integrity": "972a634fd5bc34b242024402972cd5143eac68d8dffaca5eaa4dba30ce17b027"
+     },
-     },
+     "@std/path@1.1.4": {
-     "@std/path@1.1.4": {
+       "integrity": "1d2d43f39efb1b42f0b1882a25486647cb851481862dc7313390b2bb044314b5",
-       "integrity": "1d2d43f39efb1b42f0b1882a25486647cb851481862dc7313390b2bb044314b5",
+       "dependencies": [
-       "dependencies": [
+         "jsr:@std/internal"
-         "jsr:@std/internal"
+       ]
-     
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [version, specifiers, jsr, npm, redirects]
- **[what-changed] what-changed in deno.lock**: File updated (external): deno.lock

Content summary (674 lines):
{
  "version": "5",
  "specifiers": {
    "jsr:@luca/esbuild-deno-loader@0.11.0": "0.11.0",
    "jsr:@std/bytes@^1.0.2": "1.0.6",
    "jsr:@std/encoding@^1.0.5": "1.0.10",
    "jsr:@std/internal@^1.0.12": "1.0.12",
    "jsr:@std/path@^1.0.6": "1.1.4",
    "npm:@prisma/client@6.4.1": "6.4.1_prisma@6.4.1",
    "npm:prisma@*": "6.4.1",
    "npm:prisma@6.4.1": "6.4.1"
  },
  "jsr": {
    "@luca/esbuild-deno-loader@0.11.0": {
      "integrity": "c05a989aa7c4ee6[REDACTED]
- **[what-changed] what-changed in shared-context.json**: -     }
+     },
-   ]
+     {
- }
+       "id": "1bb0d3d08f1cea10",
+       "ts": "2026-04-21T15:20:06.811Z",
+       "by": "hudav",
+       "data": "dBViFNTOq2AMOSrkMjVOADEeA7siujyv0uTsDs0qH/6weGy4g8tADEg9jwjkr/lVKQxsmk5asFMFxYcifEOgjO29EjZE+Oqr9v0Iimj6VCA8DdSrT4mbOlc+YMIloWpBi7tj8zz8Bd1RHHzsB6B7dUoFoTo2EJI3f9PhkrbO9yvI4JITbUKE3J58iAezEdNuea5b9m8ddWfIGPNU8Z4pIJpJ32JxKhSPwEf4pjgspTYc6Zf16KLEtKEztKC6uVGz6thDoESApzrLXGU4Xhi8z024CgTICGXET7iHPSHXTtFFi6YDBdfbp8rehePWaGZhKj+agokRydztB2A7AmGFLC5exisFFO1fzibCZ6WuQmw+cig5Bh3oTP9E+ourLqlKohDySiqJsTcEggUvAlpEDziuJDptlbce9VO0jLHF1Hh6x/7qVrxtLahCawsh4TZ57kYxISw9pxpJbLyy0eG47OMwfggNGUsSUANPS1MkdcEXQVUEMxSynOUU6+pKA7whck7KrWmlkGZmsRNEYOHBi+J5dEDEM6QnwPenlWixA/IAd4Zq1NW3R1/oWg7paNiumhzb0UVpsMfoekejlgVgzPu/NDYu1kADyoqRrxXKmTYnS76LCxX6SmBgDEu5Av6Pw6Ck6Pg+Rg+Xa9K5CgaKNvFyU+1jHpQRrh6dDexnqygLfqzdNsBUpd0+D8yn9XgzptbBLXSzXdRUCLiBx0Vjy+SdAvREK+5h8p1t/z5g6tOMMkTCWx6PYwsng8owgo81apniO8ZF6x7atR+6Hz7oLK46z5PjUuvdGcO4zlygQM9x+Bzp2G6p4B9NTUtDDPl1OVIwKwg1El41ue7xlltImU9hQHa60+puQXumIU7uEzm9J+UtIeGlM84e9EOt7yUnQzVodSkCiJAhAqUSa4qsv3hcldOWeR41uQtnsHJI1btQepCQGRgGS4mrMrO/8au8SM2bOuFhNvYqyhta8k56PZORWlQo0X2czudPsC+v4D/1Y0lmNr8wwQHcDFFojytuCqHCWxQZRjXJKuJ8iZG98gz5Uco7ZDh/mZXmWzjf2G1X6oSLGws5BygtYdlSLhczowG+S/QLlFUEowhy/nxa96zmflyWWUhh1+Vt8AFbRosWc7fKhDpAaLqt4SOU04PGkO55maH+tgMYpuwZT9PsVoX/686SBdnt9G8jiYFYM8GbsO5uwroass6JOzV1jlH1ZbJWVCajW4U+r0xJzAPAmARv58DFZ9y85oOMKlgbm4JW0KNr8OuWgdzd4p1Jty8+tAMuEAYilokG65S3Xj+5AyvuaEyt7yOYRrPSuSxLG0wAgi29DCaGIRnx7GJwsjAEut6KFmeWY4Im9dO/6UYY0Qn80YXlaodszI7oqv9OpG4DKoCOulf7vb8JkVMWFVcfi0gE4ZVjF2ZIR3y4RDFd+GN6CY6bSqUb7bKdNpnodCPlZJ1HQkZu+GoZe0oV3KrMPZuCBbsilIlTliWlTWlhjZs/LG5suTkU4379OxUWlnBIpYDRYBPVNpljaK6gYuEsEnkcC57aS2zijkQLvdkkniM2itTAvkRGiud8JV9gCSCRg+L4AvIxWVByXmsWwKO4G+0herUyCfC6a/v1ZxzazWWmEaVtXRvn2SR4e2NOEBiKTvWotb5V20rLp15BJOmvA/JWcTo2eaS11TLjpVQii3pL/4B+9QKX88MWJkFhTQkp31KleX6gsRou+Hf9EUa53XfOLEirhR/MTGiNbQlYdyJ6MY6U/VLAuqtQJTrAQTOZuS2/9NEK1PAFZIUwa/irKkCj78HEiRZCTD7qM[REDACTED]
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [v, entries]
- **[what-changed] what-changed in shared-context.json**: -     }
+     },
-   ]
+     {
- }
+       "id": "c4a7d91c7bbcc721",
+       "ts": "2026-04-21T15:19:59.140Z",
+       "by": "hudav",
+       "data": "Ij6chHL9/bKWo6V7yWoWZlFv+Xws8rah3N0/R1+WX/5Nyy18xc1KCW27H/dgl2S3RQWBm+/5hR4K9qREv9JGihCIfeu+h60tnk9WGkaeE4/Ti3clQpc3EZoUcQvEMNgj791W2otsxqusgFE4+E1gkFidzWbiQDeQ/pxQZZxx03DU9yWhZ+X4o2k3KO71W3IJ7SH+vRNvHGU/ZwvGwM04SDpLoNFEeExfyFQIPIV5Yut2bJ/7590/9MChK3QH+BqhPKtUKNPKRn6sXdYdIkSLpNSjo4NDqFqyzc3bRFf3lfojBXeArPEEHnPAOiTPnhv0Nqq7iI5K5VJN5URA0zp/ENAJW9NCKbyDAEXaPh3EjuXOZTzJLVdiQLVFAYfHuLwwduhOAn6lyfgNiIHwfmFTnfV8z1rc68RNn9MZouVdU2ZKwdt9MqRhQHO4QZylNPbMIQxX1DiLrWUFtOEFSnB0dDbmGFoCRO0XZGl1VnoI/NMdu4rBKIsujqYO9bETdO6WOG5fmn6hUUattZD5QsRY6kTl9UR8Ef1c9QKMdUFiwItigOgSr+8fjfAbdXmBl8K7KBU6K4872CUA/hvX8d26csNaH82g+LatIjj8CVyyFX3beJXQhrmPhp/HkJJGsnsxfGXjvMJ6WMIk6llcqypM3Uv4QOXw7T+D4NHbmKg/xPvgoCNcWfzQehXL9cYJkZlRC3TZogX9Qc5oS2Lw7h0KwKqHBKQPfdqR33tZ+ONGB8tjJtAeFD7TbfRZiL6KnDiPxjkDUh1U9rMf38VZzIr3774F5BRrwC0bkGuw7dRyh/GvqTbCn8mFNeTNog1IPog6q6tHTosQvsF2bRYop3cCbnabsU3/6XWtDb/VOUJgFbrVYC/eflXVutRN/7TpHVEZU98UrzTgsTh0p2Y+hFPKxWzqeRUSqp1Goa7UDpg8JRxtvsJocc1aFfrIktyy75rWxYljifVxhnaz9dkHHLfw2+DnbK55LfMvvh7Qkm+VaefCfJdIFe+Z8qW22sCQ4Afoiw4Im1LST3WIboDza3y/JasnOcTLL9fTThEttQaJsIOlpJzDUw5Qpq9w1uP6JhDWYfyA+KgRGHnhhUOD+3K439K3yuPaWPtR8kasej7So4u6oc1AozddwAnS/ScoL/mFZPHw5w7YK8CbQI5KCg22RYFAh7VMg9nRUOE2wrXcK932rx9AVl4ZSzVvfsc4o0gPyioSoyZWeuOqlaREQphJF30i3n58mYBa3CD4vmjVtIzopsPTX9uwbtj6UPzp+YNXRaaKcESxyICNtv+4VjqT6ay7/IcJXTKCkpsi0+NM5CVAm+CAD7FDTMr0Pdxcea1LmA3hCfpASTUBDxaBmeZgJIGVUm8P5RvB/OOuXbrVgnTP8bFSW1mFiLLI9OOMk5nQ4d+Ac2IYOuqR3P+d2ND9Ll+rP/KCb1BTCeU9AV5AI8653IIrncQ0O2eXqs31cgdOa/TC5MpBqOzPnvmSdcBiAbHMygHlYpIP+3h++RAsSWvUvogLXdGdI5cU27Jq5dEFp17BL2bCpaJLUQGAaBX0c4mq3CsED3/G8mB106v6z7VlHO2L8qr3OHFkEbH3qzje9QW6JYZVX3iWuqE1jfdmGyU1EgEC1qUrZSN8zGQxnUbldHhffGkPehVSGbx54hKBJ7ty52n+WjSeiAOGt05Nf7ZFpVQQf60SDOkDEopLFOuiRkVfsz3k8LCddKKtOEr79aNE2Jtf+oGGisvNx6eNVD6qJuqUIcAczFIdE72eABBGREfzQbbeFdhSdAfjiwUBd2WmzDt+23irTFxt5[REDACTED]
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [v, entries]
- **[convention] Added JWT tokens authentication — confirmed 4x**: -     }
+     },
-   ]
+     {
- }
+       "id": "6a7dbc5253f45496",
+       "ts": "2026-04-21T15:18:31.748Z",
+       "by": "hudav",
+       "data": "FSLuhZ/muVhcfivYzBQNzobIQ5ULyuQhi1u/lk3ozBtibtzZVlCid9ZDDFjdNbqWzY9kVOLHnAL6k3bHsxY6+WKc5itMfj/c0ivA9UfAPHc43+MPk9WaUxRouA0qpNfPiwXl+HOwF4Nvrrb8dmaRonIdyo6AHDedF53oCDEnY13EBipHtHdoKdKigbfHtiN+EzskS1oa0NghoqvU7pvWvVZ4FrAyIg5ajK+t8tPOo3Chlr9eM1kWzyQee4qpfRH0xAFSo0+AxqlVT/nl39jkuwQrPE8QZoeVeTOZXF+MHc9cq4H++XidFyKEbXuj6dZZtCjGM+n6wVm6anDuQiHMk3HcSTlEXgS/SoNdQgV58wzcIqr4P8y//xF+KLf42p23iFE1vNjwT8o1pK3YBuHRw4KqzMs0NNvg4Wpr4vuZMJ8I0EIZ+4Dt8FY2iCunQLQRhcf5KHn+exXmEUrnKM0Mi4Kf6kXF7lcCQLz/r+1sRTfMiAdB5LYruga6GAD+RyhSMR4febA9W43r6vJLf5cUeTLeKtm9RfoEmj5SPM18d+NpRnH3t6mhrZPZWp9pf8xdnpWldJvLB71+lKvOOvEVHL3R57oRCNHP2hgHClZwsZAIE5JJLuBY3nMPgRgy0EoV7K1VzA9v8MylLE9aIEIze7pAS+w7SJATtxUlgT/FwbClQzlovN9oJ9K5ToqVQ/6QZknPDOht/EXTkoQ6W+UTw3rtun1IgwqJIfzD2YTYhAwlToSglRO0x31dlrDGPoqnBRkPX4H4KeX27r6yFEaexlXYveKt/o+lGnZ/0pwRMIhueOmmS+2cvo4+ne02EYMMPavT5bP6t4yXxhGh/zsW6maKNrlLhsK06zLxh3kPuldrDTJSBpjJhTzKAbotBHsLWm9y542jpvFjw8eodC0Z/sxvwkDLZgCOXgM975XuLHTurK3CuLGRkbb6Fb+wKsPGe+ZHGmpxZ7gPXLd00ns2rD84ERUjaGGiuroZpAQ0iqz2eINtwH1RH+xUd/bVI1N42QyupYkKYK11Wnqh9ySSDVrMrIc7a1UC5ZpkTalRk7rqutYQ/nuQ6/pP3qw0HVsOEwJY/xC92i/tV0OW8y03QS5BHHL+7NmpRN6vQHeHgt3ROpIPcsv8+CXh9013pxdSf3FmruPShBw8Ag=="
+     }
+   ]
+ }

📌 IDE AST Context: Modified symbols likely include [v, entries]
- **[convention] what-changed in shared-context.json — confirmed 5x**: -     }
+     },
-   ]
+     {
- }
+       "id": "95f5feb8c63455b3",
+       "ts": "2026-04-21T15:18:24.080Z",
+       "by": "hudav",
+       "data": "FYeRvaG86GbmmUL7UW5OE0O2TYB+ZJDmooGkGdewxaolL41JKrqgDPkE9+x49POF1liRnaGYyfVaBX8rIgyhBhyosSF4Fyaj9lR2SlPu1oCxeCduTQVgEZ/vYGDTqJ5SP3l/cHp1eko1xAiZQkFzHW4k5KhBhp4CQ0GeIvM95WSiARogC0RXnIxx1M5maqoRUD0pSVG75pIeL60rK0FGO/GhCbrpgIt0f+09x8cTrxmciKAQmyR8NvQnq1u0pIOdfqbJ0wTa60Ru2xaHKzuhk9iMnmasRN8ViFrT3LIWmbtyXunP+rfSaSuNOVYf9vLU4uTvpOW2xLOBKwcIQuZFx5qWimAEK/JI7JPDlsfh3H62GmK4P3qMEO4NeOzaUdHCu1qpmuzNc+UquWjzAla3400IVZZEUf6o66fdS/S/YtJeniCJUi5U9IW24w26E6GS4TZhpDqvvuzAp5VI"
+     }
+   ]
+ }

📌 IDE AST Context: Modified symbols likely include [v, entries]
- **[convention] what-changed in shared-context.json — confirmed 8x**: -     }
+     },
-   ]
+     {
- }
+       "id": "1e9f8afa0c7b7ac2",
+       "ts": "2026-04-21T15:04:15.507Z",
+       "by": "hudav",
+       "data": "D8NzGZSbF37doLJd7gFpFnIqDO27UtphbYZkCsQVvFJtJFDed/LHGuZEyQaP3W8fL/IsAweQDv9LqphX9sBxIBJ8DoJW2dYuw08iwalQHt3a8c8TyTqtHtoRC7wpyKtpE7KCsKDq8SjmpIvSSVsXjmYdJc9R7NL2jhd2MwYTlAHGooarrTvWJ2rfr0Q7QVfMOvijGCQuLx+NmovzotCysVLE/ZIh0vEz4ewSdI+XFlCwWT+5gGbGt6YD84zNBPHPy9tPpgE4f2pga1ksUOU1etzGlmMwCGnXoBreSSvOX+hAjU4uOCby0FvL/h0k7Jtz0F+zwypAfUmkQ/vozYFIogRHEhYexeXzB6KX2v0gF8fGBdqbK26jMPfU5Z6Xbh+4uZFRlR/jqP6qLrF6WN6u1JmTJ1a11oTfOtZhkiQ2dBHCKB84fZ+uknWmXvsF/OpsNLLrUIIy/X5JC2A0BURn2RaIo4Jx8bfXTOE9BS/kTyzgnRBT9U0cbWnDEP9z///eMfP6jUWVDaIesFA3QSu1ujZ9Mgbe+ce/wiTEJ+L7OHIJJ8FToB79TFejDSE433UQITvsYSVbrfYeDgjIyxoNEf7rZfM8tg4VfobCGcV4XxN4AsTBneE21JQTU/whiLsMnAuXN70+gVPlmZfH9TnAGYplYqyl3snA+bNZi96zrCBXgH8Y8toUsIkihEYUhyj69RQz4Bi1ZytE5s2ZyWwovJT4+cQ969Nt04pLbxdEZWqeaD77mVBggoGV7T+fb0vFXPBMOVAkSJykUsqo3fjzXVvmQGdCLvME9a4EzJ59bSXzHPOHduDUoB2dc3j1tkdTpWq0PtsmV+ISm6ZFaWXENzM06P8DFlTel2X6uyqWawN1XLoiQ0iMqVshR8Vbt/Zua9NvwecKM8eeRXQmjqPmW6B/4UVLqU5PlQ+8d3wNKShWqEpF5L+3Hi21+k2eqGFQV7qKgOSLBHFC6jSWNLz2r4i6NHUmslO+mCZV5hxc6udfB8UEawCSON0RHomr7935XR9v"
+     }
+   ]
+ }

📌 IDE AST Context: Modified symbols likely include [v, entries]
- **[problem-fix] problem-fix in shared-context.json**: -     }
+     },
-   ]
+     {
- }
+       "id": "6d4373ada43e5757",
+       "ts": "2026-04-21T15:01:38.460Z",
+       "by": "hudav",
+       "data": "aPo4+2NofGTjEld/3A0d1NiMzFBWIQktEWcGWvlpMxqzmy3E/IqfU00LiYRyToKz6uyvs9fpfix15IziBa2SjaDlL1scTkdeBw+6JK+JHap4V95yozfXkuhf20D/+fHTV/7uaynQ4Qo+LnFZYx19VXgfqI9yOL+JJh5GuuiN0+Ca/YCV2r0RsDwcwoIIAAyj8kkXrNAf6D7am/ofCHqtMmT/X6u4WM7RDne+j4LLElNkOuudn2lNHhtcoseXKgHJL7x2V0ETZTL8u0n+cXyvfXwKAv8WJJNgYGcWwudwfw9SY5Bi+HOXT3u9Amo4v+pNB5RrqmzuubdHaS6aEnW2/e4MEBIZfsrPg97TkUCIw5RfALjyCUKTo6GzwxrcPdB4VQY+Gsm2De98tUaYRtCyRnmRaHLYC1jaxxJd2ctFx4P2LTBjuJ8AACmjz/g4A/4vgN9keRrW9Tl2oFL2IYeIAfrHncJLCfiYQCm7R8i0hhLL9hnAdSL1GuV28fjpfP16GO5MBIfAYXqq+J08BiET8KZaKM9QNy2zn6f6PhzVPZhdHVzKXYhZzgG8J9fi4sEtjpDaHYrRoeg98/dB6VRhF3J5k3CvwrGpvHp+qbsZN70zhYEmOz3bLb+m4azOOraIEVuYL1TmuYdrcstpN03ylnkTX5JJ6clF8Aqgj9proVNi9lpMGfIdH0kyTkqnDAZ5phJYgYPrVxQnsgI3NDZaArXkkHZht4gOKGWOdr+fEvfkGWqw1OKyK95erYdr5eDDmU2301ll1xdVSg6vniL4P5K5hqruEQCnvOH3R+ZmEwckQHi2v9GPAmSqeLnsNsMQq13lXzoGROQ032TxSOiEI22I0pluLllnalkrpnxgEEDSN1bOkT3E6kM8aXhre9ZFSvZqEge/AlCzISNCmHz4XVDTsiJYZPjouztI6NU7aE/TxyCL+gqHF21h0yj4O8zybcozC0HgjICQhX3hYb3g/7BUSBHz30ymEmpA5Bgb4RxteZBGuecjfwGwaf8oeaopHdBsuOoCAVMdaptnOvBjYz9qOdK60h0l"
+     }
+   ]
+ }

📌 IDE AST Context: Modified symbols likely include [v, entries]
- **[convention] Patched security issue KXpRoErBXN — confirmed 3x**: -     }
+     },
-   ]
+     {
- }
+       "id": "1cf1e21acd7ab6c7",
+       "ts": "2026-04-21T15:00:07.256Z",
+       "by": "hudav",
+       "data": "hsdOIH5rpSqBh9D3nwl/30N8aSYEPhI9eLdElcdwOhG9bugc856d/KhUDxWHb1mZoDPVxa6oxqH41Apa/f9BesbKE9iwHa/Okniyezt1l0UbzXS7H4b+4rR51DXnpYMjBPMhBa2TbhA2AvCB8KYb7tzzWZRit1fhwVMnBPzmPQ2WslZyK1ckajvuDCL9387YzuRfDwndzm0LjlH7y/X3H5sBEqlqC6dl+DlQRI2tlg11uCcWKViFXVNgMshHUv712ILyMQWiTSFPKFBWGPr9ISDk5Heu1zMdHok2/+XPI2zzCRrcEkrenAlkC80e4qutbgzfFy0+B9tHV79bXribzvCA2/25tV1zrtvW3sIkEFzMifp66BKoqzuvZLLJHYVKMkkrLHKQsBAcmNSnRhAFMyAA/UYmjOy7G+uZMxeXmOAxfcFAGR+CzS0By2TfLr7nijcg0mEBdLjnKB0xYzMgvClSdsMkmCIhcYqFTR0Rue29RQ7acnE6lNAnIzv0xMpSPMZGobk1Eijif2JgojKSZg17QjQuHVuJHuNgMhWIJy4Qys4n38EvmsrjOMMZDNUIZtZIr0+RTI67Tfsd7Qu3atbcl44HTvSRriTRoi+mz0/8mePYA960TUTel+wP3lO1SRpLXMGPlgvFkAMQJQdqSGzzlscbBCl9vw2ewsv9BfCBvTffiB5B9osgY7POIaBnqIGjG04ab7tv/eUZyA6akfzpJz3Btdy6UExoChTYPN9NlYgFcwzKmbugD+eVBb7btBrjso0IyTY9sYFMihATfuiAvpI03xlSbCEXXXGukKMcK4XsyGwA1+I0ByoEeas9m69qYRTJmC3ucvLdpnjCidtA47jf6zn1/AAAwjNmzEYOoNv7h6KBamXDyLSfITbp38PSEoUqFu6etZzNDn14IOebAPSsHRnfyBrVCnwQacsNmPQF93waelxIOyK1l3XQvIWh2j1LoxYbhxX+MS5e7ZO8D1oWCBJXoiujnlYxfozgLfm5LXRX5tjEXRS5R/bebqJmhoBAbkWQf5l6FkVzHMhpz/vZf8XszNsBqxBrcxzEbG33TTbSoDXsx3b3h2V2H0MQOQ+E+8fGZYMVYkLVMZ+SgqIHmfyy9l93F6dtrdYkFNDY8P+CpT5mp1sSBYxKM8wHGqnlhVrceMEDeA/crs/qeBCvlqA/SHRWIrGtDSFaOdT3i77FKDFPzbHGEpOlu0VxOSi4E31q8kWPWxiYbO7zmeVPR35FoeRRrGQMm0kc3kKGsrIdbyxz6Z/f8tCzd8SSEls/O6aRgO+7MlkwK4dsUjGRKcodOtgbHn7v9Xy3XLupLnZujDGhdSVIJSUQxSnUr1mFheOQcieBSeakOYTBHVc+1ZvqnUOuk1VWJMqAAhAzLBNMCZcUrnBtu1JyWZdlFJr3/Yb5WZ/IfkMFgg3MDN7MCqM0X7aarBFUFE2PncJRss5+d8Yr6dODgIAv8d6/J86dmMsSaI6uG2L+0xmKmDk9SNo9gkRvG6PW9ndoILhNRWtVin2j0hH+Vk4FpuOQedZWdjhzFsyK9V0Kd45HkDT9sRqqZcbpop/rtRX9njNrYJY6K7Q7LGDt38UAEHksY21VOr5YY8mE0oac+1cr84vsMPiJZFcAf4Yw7rR46bD5WoyKe3qk9Z92Aj4ABylzJiZkFjZo2Af0yszF0bA3KrvaxubGdS514AXvirFFSURp6NaUlCzKdNjgJp3TLSilBhzvEodE9oRpKUJ2/QdSkyaoaky8gE/1TrDpt3tu72D31xTrM3i+GSmu686dsBobDoa/i5za3Bmr6[REDACTED]
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [v, entries]
- **[convention] what-changed in shared-context.json — confirmed 13x**: -     }
+     },
-   ]
+     {
- }
+       "id": "c138957d72ff3986",
+       "ts": "2026-04-21T14:59:08.156Z",
+       "by": "hudav",
+       "data": "igoJJJOVBs49zSKlEeYfMW0VpZbs+GnsPrjN2gPNorBLSKZoMPiNhxmXVdVLn9X6/Rl8mkyVuMHlOwHmOpdJP/bf7QwCqYV1DAEQMriV/yDX+HGjnhHpRnNbxCQCw/JhVikooFAMZDyNfHwqBGB8EKKpKRvT+hInyJS96I5LhedBjIgWJPM9CRJ52okoXTS61kP1bORjkkEv4mYKEhhQ7eEuhaUy3hA2dyfomJabF67mI2gj9vAcQ1rkDq2Mvg65yt+nkgyZUpiiwb8pFWfpiKD8paJsChjbodW2RCv6NEnZyTRSozr5IUHtZuCauRBzTEqoY1klALldU9J92RY0DN0gVtMvosCtJvQb9rjcM8WsDjJmp8c9eL2qsjFFDmaWBbPY590Mpdm2NllfjGTlrLTq5kqrApCK9ZK62x+jiHk4TAPIUuIZFVDhbDk3UrB0uKbNDQqg6CYbIRCW0nhP31UL+E1Wl7sfZATeFigQ5Q21J951Q6/4ewnDJmBxGe6y9Rzbodq+PAdlabf3eiW5siCq6RGl4E3DykjFgp2SCruTojvR7xxiztrENRbf76GUHekWvcYAGT3bVp/ccX+oAcJLcvLZ6EOQhRCYrTmMr0AC2ED2Ygvx7RtqJK5iCHGyv3KXspECRQ7lqvWQhE5EOJKEpcj01ALCSBV9v+qLsHYBdJPUE1Es2sZdi2JyFrt/Kz6KlSwTujIB4uH4WLuDobXCHR0ci9t7oUl92fB5jK4lnA5oqa433/pQO3isC2AE1G9J2vfKe4KFbxEcP2C8QUyiYrlLpz/gOAwXGERgaKz1Dr8enVwtt0zmtdBNY8iqd4AlcUYLBLqWLN/H5qYHsdLErrTpAdQscyp1weT8ndVfVzZWRMQuUMp80+CI5Dx5DiV9iDj9Vfuyd5J0Mus9ZUD3b4dNIFc/Gx6qVSfvFrwPO9aM2FgMnMkdOi6orPWhr5CGLazs13wJMjn+3jBorpzs70J4z5YrK/6EjFQpUX9DfHcNo/K/n6gaKWJfp7poCACwtHLaEEm0RGMOK15vJ5/o/bXaNIi+ac0uaItJzqSryEdDb+CDkw+BL7aMSaNH0SNyq4pi3fLPP00oA22Rf8RxHPMd7eSiWZNYn2ilsJTOBG7IF7ndliI339hP1DUGqzFf+OtY0y0ZrB4L66MIi6Tuc+fVw9ByABmt1jNdbA1gVTBgWNiIDXBXN52PY83QCWzVXJ+EoEm1vLm6+K04TVYjvwfykJr/EEVSibWBmUQu8mDtlh8QB7GD"
+     }
+   ]
+ }

📌 IDE AST Context: Modified symbols likely include [v, entries]
- **[decision] Optimized package — offloads heavy computation off the main thread**: -   "name": "prisma-client-7bd8e200dbd093828fee8b3285022970ae7c2b37d3193c78e6c7b3eb1e5f8549",
+   "type": "commonjs",
-   "main": "index.js",
+   "name": "prisma-client-7bd8e200dbd093828fee8b3285022970ae7c2b37d3193c78e6c7b3eb1e5f8549",
-   "types": "index.d.ts",
+   "main": "index.js",
-   "browser": "default.js",
+   "types": "index.d.ts",
-   "exports": {
+   "browser": "default.js",
-     "./package.json": "./package.json",
+   "exports": {
-     ".": {
+     "./package.json": "./package.json",
-       "require": {
+     ".": {
-         "node": "./index.js",
+       "require": {
-         "edge-light": "./wasm.js",
+         "node": "./index.js",
-         "workerd": "./wasm.js",
+         "edge-light": "./wasm.js",
-         "worker": "./wasm.js",
+         "workerd": "./wasm.js",
-         "browser": "./index-browser.js",
+         "worker": "./wasm.js",
-         "default": "./index.js"
+         "browser": "./index-browser.js",
-       },
+         "default": "./index.js"
-       "import": {
+       },
-         "node": "./index.js",
+       "import": {
-         "edge-light": "./wasm.js",
+         "node": "./index.js",
-         "workerd": "./wasm.js",
+         "edge-light": "./wasm.js",
-         "worker": "./wasm.js",
+         "workerd": "./wasm.js",
-         "browser": "./index-browser.js",
+         "worker": "./wasm.js",
-         "default": "./index.js"
+         "browser": "./index-browser.js",
-       },
+         "default": "./index.js"
-       "default": "./index.js"
+       },
-     },
+       "default": "./index.js"
-     "./edge": {
+     },
-       "types": "./edge.d.ts",
+     "./edge": {
-       "require": "./edge.js",
+       "types": "./edge.d.ts",
-       "import": "./edge.js",
+       "require": "./edge.js",
-       "default": "./edge.js"
+       "import": "./edge.js",
-     },
+       "default": "./edge.js"
-     "./react-native": {
+     },
-       "types": "./react-native.d.ts",
+     "./react-native": {
-       "require": "./reac
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [type, name, main, types, browser]
- **[discovery] discovery in shared-context.json**: -     }
+     },
-   ]
+     {
- }
+       "id": "8ce13240a6007553",
+       "ts": "2026-04-21T14:50:59.919Z",
+       "by": "hudav",
+       "data": "cEob+SSJ+dUsibF9Mfk2Wwba+pweE0hZh7DPe/r73iLQbNIc9cjsGKtOoCL+tm1+jBCoUbQOWW93KZ6TYxNC5Ves6vE6utFyT3hrP9JeDKxEoCcr7aeezf9AYzzzRrfuCwpNhfP2ahGXQEKfFX4LUqlpZUs0t4C35IW4IEwdtm0WjYu0O3nnn5N6X4cdBz9Eqb3gW9pXS6Q1jSfUQ8yY5/HkwSLvdESVWo+jfzFDMED/zzB1FbywHEPic1mSsmrb/BXkv3h+0WpX5gjoo46qJuycNKKjsgyG4sTIlOy53PubJk5Cc+2eMtRNfn7XvccSU9d2HSGxgAflaxLEQTGDoSepnfB6tXguXObnZh7j45MNv69wmKsG4KALvbYqj9v3o7FWZ3aGnW+9Z1xBrH0bn5uV104SfkobQtI/M7n5S9dehGy573wXxviNstICCv4m/Z9EACorFgKaNSZwQzX4phsgCpZx2P68NOEKJo10h/xojBVW45I4TuTmgqJduQ9acQ5qjfdAkxAQ/r6hlw5ZurjkLYTOa83zmYV+Fb/1NUnL+gcV2b2AEuaOjspetA4ukU1X9CEwuIggv+KgZkkDRJqQin/5jvK/nshR8Hl/CbTgncdBVrP2ku7PKdcdncwjt8tcj3YjbceiRfHpWeKXfbvPVBWqJRZamIm1hCzVQ2Mh2NhBLVzx42ExpTVOUA3jJm6TmNM8VgM9aEWPTVdugPwg59ZI5zylK/V6Ye3vE1ADK6hq/8F8Beot76tIlMYCXYx0uA632l83rlETmnbvS/nOU9LPUmoYh/JqMnt1GGtdPtEWg2lrT1kdeGkw7sYVFmmLwUrs0bAM9rDY5eirnDgSkTlLtniBo+0+LhAur3oTIlVneDOTs9G+V1C0tlkdI03aIZu1d+TyqKlypGlQSZeUNM8WFSngmHuSnZB+MG76pir77w2V1Yv/TuaFBPbJCq0rNGkQ7IsnvMzqy6SQhnRKt6dDcbLxo/DC2cTRIg=="
+     }
+   ]
+ }

📌 IDE AST Context: Modified symbols likely include [v, entries]
- **[convention] what-changed in shared-context.json — confirmed 15x**: -     }
+     },
-   ]
+     {
- }
+       "id": "494bf38abcba8b71",
+       "ts": "2026-04-21T14:49:30.950Z",
+       "by": "hudav",
+       "data": "H2FtJAMn7ireYy7/6VQ539zvmm9niVixwGCqVL9yBKjV2WS72YZvaBaY41W6Z5+wlj7NXz3PwlteQLR54rpdo1DFzfm3kk/AGsoqirNnVCC78oZ23O+QOgtoj+0TDtSt8JyNtIG7pocAiLMauA7gkRnwymAxDbbDHzJZAS+PE9OizmdGA3mUGl0EE/5LkIydsShLoPTdxfZ+x7tGxL/48lC9aobbSyLJYK76wc5EYBF0mhWYHix7u1arqyt8zJZJjrALoypW/U0mc2/sKgoUW7FVWcDwTGNMj5zqs6cumvwlFnCr1VCg/IIRI2h8C9TV+3FzT7j4B8I7EX8vv4IpheoNhMKgm6LffnDDBpAsjWVEmfSN/tMcrYB3KD/3DoH7OMmtCTrz6XYW2qxEionLLdjOlVwr7jBNypeEHn0T9r+scg8mgUgdQns0MWxEOSEu/PziQB7X4N+tWrftDjAS114c0ar0ebdj79KuHsuhVbyf7qTw1aRgEnhD9WVqyr91oVUP2exb0taCE3lNtrgdRikf7FFTbx+qjdccstTUAcmQZDS4aqGAMZGXPHWVzNHYtRbDA0V2Ql18sv5K0fw0NWQT1bTBMFdeNMxtgxPdMYEwPomydrqjieR7dISDf3JufAZwUWoZ2DPxReBwQeagpCLPmFyC6dIPnvKg9wM0FEHVcSOJ7q2UyxU8lA0hAYVJpHfQWB3N847UeZii5qQE29yf0JHvqVMVQVne2FYhPeTPH0yAZET4+BEgAv1hwp4LhR4jcqoWsFVHbV8gHic2u1n4dtvDBgIb/E7GqBnYZZ11rc9lmlpLmfo13jqVdtDUp976QgjOARDZ5vw9Tepcece5BCsJB/lOV/W+PQe3PomrbEsjbAsa4UxsHkkVMmiOSZez5myCdazTTS+LLPUQU6Eaiu0aHvwvkkzVej6WOr7ryjPpCBS+Amw="
+     }
+   ]
+ }

📌 IDE AST Context: Modified symbols likely include [v, entries]
- **[decision] Optimized package — offloads heavy computation off the main thread**: -   "type": "commonjs"
+   "name": "prisma-client-7bd8e200dbd093828fee8b3285022970ae7c2b37d3193c78e6c7b3eb1e5f8549",
- }
+   "main": "index.js",
+   "types": "index.d.ts",
+   "browser": "default.js",
+   "exports": {
+     "./package.json": "./package.json",
+     ".": {
+       "require": {
+         "node": "./index.js",
+         "edge-light": "./wasm.js",
+         "workerd": "./wasm.js",
+         "worker": "./wasm.js",
+         "browser": "./index-browser.js",
+         "default": "./index.js"
+       },
+       "import": {
+         "node": "./index.js",
+         "edge-light": "./wasm.js",
+         "workerd": "./wasm.js",
+         "worker": "./wasm.js",
+         "browser": "./index-browser.js",
+         "default": "./index.js"
+       },
+       "default": "./index.js"
+     },
+     "./edge": {
+       "types": "./edge.d.ts",
+       "require": "./edge.js",
+       "import": "./edge.js",
+       "default": "./edge.js"
+     },
+     "./react-native": {
+       "types": "./react-native.d.ts",
+       "require": "./react-native.js",
+       "import": "./react-native.js",
+       "default": "./react-native.js"
+     },
+     "./extension": {
+       "types": "./extension.d.ts",
+       "require": "./extension.js",
+       "import": "./extension.js",
+       "default": "./extension.js"
+     },
+     "./index-browser": {
+       "types": "./index.d.ts",
+       "require": "./index-browser.js",
+       "import": "./index-browser.js",
+       "default": "./index-browser.js"
+     },
+     "./index": {
+       "types": "./index.d.ts",
+       "require": "./index.js",
+       "import": "./index.js",
+       "default": "./index.js"
+     },
+     "./wasm": {
+       "types": "./wasm.d.ts",
+       "require": "./wasm.js",
+       "import": "./wasm.js",
+       "default": "./wasm.js"
+     },
+     "./runtime/client": {
+       "types": "./runtime/client.d.ts",
+       "require": "./runtime/client.js",
+       "import": "./runtime/client.js",
+       "default": 
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [name, main, types, browser, exports]
