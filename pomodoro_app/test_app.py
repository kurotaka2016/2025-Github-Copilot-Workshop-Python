import unittest
from pomodoro_app.app import app

class TestPomodoroApp(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_index_route(self):
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)
        html = response.data.decode('utf-8')
        self.assertIn('ポモドーロタイマー', html)
        self.assertIn('開始', html)
        self.assertIn('リセット', html)

if __name__ == "__main__":
    unittest.main()
