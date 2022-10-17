# a partir da pasta raiz
find . -name \*.test.js
find . -name \*.test.js -not -path '*node_modules**'
find . -name \*.js -not -path '*node_modules**'  
find . -name \*.js -not -path '*node_modules**'

npm i -g ipt

find . -name \*.js -not -path '*node_modules**' | ipt

# volta para a pastas do modulo 5 - 05_javascript-regular-expressions
cp -r ../../01_javascript-testing/05_tdd-projeto .

# 1s -> primeira linha
# ^ -> primeira coluna
# substitui pelo $CONTENT
# quebrou a linha para adicionar um \n implicito
CONTENT="'user strict';"
find . -name \*.js -not -path '*node_modules**' \
| ipt -o \
| xargs -I '{file}' sed -i "" -e '1s/^/\'$CONTENT'\
/g' {file}

# muda tudo!
find . -name \*.js -not -path '*node_modules**' \
| xargs -I '{file}' sed -i "" -e '1s/^/\'$CONTENT'\
/g' {file}
