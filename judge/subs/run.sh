runtime=0
start=`date +%s`
timeout 10 g++ $1.cpp -o x$1.out
compilation_exit_code=$?
if [[ $compilation_exit_code -ne 0 ]] ; then echo "Compilation Error" && exit 1 ; fi
end=`date +%s`
runtime=$((end-start))
num_tests=5
tl=2
run=$(($tl+1))
for (( i=1 ; i<=$num_tests; i++ )) {
	start=`date +%s`
	timeout $run ./x$1.out < $i.in > $i.out
	code_exit_code=$?
	end=`date +%s`
	runtime=$((end-start))
	if [ $runtime -gt $tl ] ; then echo "Time Limit Exceeded on test $i" && exit 1 ; fi
	if [[ $code_exit_code -ne 0 ]] ; then echo "Runtime error (Exit Code $code_exit_code) on test" $i && exit 1 ; fi
	./test.out $i
	tester_exit_code=$?
	if [[ $tester_exit_code -ne 0 ]] ; then echo "Wrong Answer on test $i" && exit 1 ; fi
}
echo "Accepted"
exit 0
