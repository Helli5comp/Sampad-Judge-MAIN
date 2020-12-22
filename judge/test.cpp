/* 	* In the name of GOD 
	* Thanks God */
#include <bits/stdc++.h>

using namespace std;

typedef long long ll;
typedef long double ld;
#define F first
#define S second

int32_t main(int argc, char *argv[]) {
	int test_num = atoi(argv[1]);
	string test_str = to_string(test_num);
	ifstream user_out((test_str + ".out").c_str());
	ifstream true_out((test_str + ".ans").c_str());
	vector <string> v1, v2;
	string s;
	while (user_out >> s) 
		v1.push_back(s);
	while (true_out >> s) 
		v2.push_back(s);
	if (v1.size() != v2.size())
		return 1;
	for (int i = 0; i < v1.size(); i++)
		if (v1[i] != v2[i])
			return 1;

	return 0;
}
