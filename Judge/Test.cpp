#include <bits/stdc++.h>

using namespace std;

typedef long long ll;
typedef long double ld;
#define F first
#define S second

int32_t main(int argc, char * argv[]) {
    int test_num = atoi(argv[1]);
    string test_str = to_string(test_num);
    ifstream user_out((test_str + ".out").c_str());
    ifstream true_out((test_str + ".ans").c_str());
    vector < string > p, q;
    string s;
    while (user_out >> s)
        p.emplace_back(s);
    while (true_out >> s)
        q.emplace_back(s);
    if ((int) p.size() != (int) q.size())
        return 1;
    for (int i = 0; i < p.size(); i++)
        if (p[i] != q[i])
            return 1;

    return 0;
}