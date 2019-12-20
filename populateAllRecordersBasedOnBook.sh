# Usage: populateAllRecordersBasedOnBook.sh [bookid]
#        example: populateAllRecordersBasedOnBook.sh 17135
# Purpose: generate a list of readers of a PARTICULAR BOOK from the current /Downloads directory

# 1. get a list of all the files in the format customer.book.reader.recordingPostionID.webm
# 1.a. result= list of files in format "../*.bookid.*.*.webm"
#
# 2. using SED, we extract the name of the readers of the books
#     ie. before "../customer.17135.teacher2.1_1_a.webm"
#         after teacher2
# 2.a. removed "../customer." from the head
# 2.b. remove ".book." from the new head
# 2.c. remove ".webm" from the tail
# 2.d. remove "recordingPostionID" from the tail
#
# 3. Sort it alphabetically using "sort"
# 4. Remove Duplicates from the list using "uniq"
#
# 5. Delete any blank lines using sed (sometimes the last line in this file is blank) 
# 5.a. source: https://stackoverflow.com/questions/706076/vim-delete-blank-lines
# 
# 6. Redirect the result into a readers_bookid.txt file
#    Example: readers_15173.txt
ls ../*.$1.*.*.webm | sed 's/\.\.\///; s/[^.]*.//;s/[^.]*.//;s/\..*//' | sort | uniq | sed '/^\s*$/d' > allRecordersGenerated_$1.txt 
