def convert_to_roman(arabic_number)
  # if arabic_number == 1
  #   "I"
  # elsif arabic_number == 4
  #   "IIII"
  # elsif arabic_number == 5
  #   "V"
  # elsif arabic_number == 10
  #   "X"
  if arabic_number >= 1 && arabic_number < 5 # mpf - taking this idea further would work, but would be super long to code out. If you flip the idea (eg. start with the larger roman numerals and work down) it leads to less duplication.
    "I" * (arabic_number % 5)
  elsif arabic_number >= 5 && arabic_number < 10
    "V" * (arabic_number / 5) + "I" * (arabic_number % 5) # mpf - these patterns apply the correct logic, but there's redundancy. If you +='ed (plus equaled) each range 5-9, 1-4...etc. it would cut down on that.
  elsif arabic_number >= 10 && arabic_number < 50
    if (arabic_number % 10) < 5
      "X" * (arabic_number/10) + "I" * (arabic_number % 5)
    elsif (arabic_number % 10) >= 5
      "X" * (arabic_number/10) + "V" * (arabic_number % 5) + "I" * (arabic_number % 5)
    end
  # If arabic_number %10 > 5
  end
end
=begin
=end

=begin explain to non-computer person
This program takes in an arabic number between 1 and 50.
based on that numbers position (between 1 and 4, between 10 and 50) it converts the arabic number to a roman numeral.
=end

=begin pcode for original code
input - int (arabic number we're going to convert)
  if int is 1-4, 1-4 * I (5s logic)
  if int is 5-9, V + remainder of int/5 into 5s logic (10s logic)
  if int is 10-50 X * int/10 (50s logic), run 10s logic and 5s logic where applicable
output - string (roman numeral of our input arabic #)
=end

#begin tests
puts 1
p convert_to_roman(1) 
puts 2
p convert_to_roman(2) 
puts 4
p convert_to_roman(4) 
puts 5
p convert_to_roman(5) 
puts 6
p convert_to_roman(6) 
puts 9
p convert_to_roman(9)
puts 10
p convert_to_roman(10)
puts 11
p convert_to_roman(11) 
puts 42
p convert_to_roman(42) 
puts 49
p convert_to_roman(49)
puts 75
p convert_to_roman(75)

=begin refactor
# this was the most common way that people did this, using a hash to keep track of the arabic #s and their decimal equivalents. Mine is a bit different and somehow both jankier and fewer lines of code than most.
roman_hash = {
10 => "X",
5 => "V",
1 => "I"
}
# using the modulos(doing, but repeating.)
output_string = String.new # going to iterate through the hash and add to the output string
roman_hash.each do |hasharabic, hashroman|
  output_string += hashroman * (arabic_number / hasharabic) # add to the output ("X" * # number of times the original input number is dividble by 10.) 
  arabic_number = arabic_number % hasharabic # reassign the original number to the remainder of original number / 10. 
end
# if the number was 42, 42 is divisible by 10 four times, (4 Xs get added to output string) w/ remainer 2. 2 is divisible by 5 zero times (O * string adds nothing) w/ remainder 2, 2 is divisible by 1 two times (2 Is get added)
You start from the top b/c the collections of the smaller nums are represented by the bigger nums (eg 10 * I = X ), so you want to knock down the bigger numbers first and put them in the front.
=end

