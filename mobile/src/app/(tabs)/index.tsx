import { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/src/constants/Colors';

interface Course {
  id: string;
  code: string;
  name: string;
  professor: string;
  schedule: string;
  room: string;
  color: string;
}

interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  type: 'assignment' | 'exam' | 'study';
  course: string;
}

const mockCourses: Course[] = [
  {
    id: '1',
    code: 'COP 3530',
    name: 'Data Structures & Algorithms',
    professor: 'Dr. Johnson',
    schedule: 'MWF 10:00 AM',
    room: 'CB1 120',
    color: Colors.primary,
  },
  {
    id: '2',
    code: 'MAC 2312',
    name: 'Calculus II',
    professor: 'Prof. Chen',
    schedule: 'TR 2:00 PM',
    room: 'MSB 359',
    color: Colors.gold,
  },
  {
    id: '3',
    code: 'CEN 3031',
    name: 'Software Engineering',
    professor: 'Dr. Rodriguez',
    schedule: 'MWF 1:00 PM',
    room: 'HEC 101',
    color: Colors.dark,
  },
  {
    id: '4',
    code: 'PHY 2048',
    name: 'Physics I',
    professor: 'Prof. Williams',
    schedule: 'TR 10:00 AM',
    room: 'PSB 160',
    color: Colors.backgroundAlt,
  },
];

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Assignment 3 Due',
    date: new Date(2026, 3, 12),
    time: '11:59 PM',
    type: 'assignment',
    course: 'COP 3530',
  },
  {
    id: '2',
    title: 'Midterm Exam',
    date: new Date(2026, 3, 15),
    time: '2:00 PM',
    type: 'exam',
    course: 'MAC 2312',
  },
  {
    id: '3',
    title: 'Study Group',
    date: new Date(2026, 3, 11),
    time: '3:00 PM',
    type: 'study',
    course: 'PHY 2048',
  },
];

const eventColors: Record<Event['type'], string> = {
  assignment: Colors.primary,
  exam: Colors.dark,
  study: Colors.gold,
};

const eventIcons: Record<Event['type'], React.ComponentProps<typeof Ionicons>['name']> = {
  assignment: 'book-outline',
  exam: 'alert-circle-outline',
  study: 'time-outline',
};

export default function HomeScreen() {
  const [courses] = useState<Course[]>(mockCourses);
  const [events] = useState<Event[]>(mockEvents);

  const today = new Date(2026, 3, 8);
  const upcomingEvents = events
    .filter((event) => event.date >= today)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 3);

  const todayLabel = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          <Text style={styles.dateText}>{todayLabel}</Text>
        </View>

        {/* Today's Classes */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="calendar-outline" size={20} color={Colors.primary} />
            <Text style={styles.cardTitle}>Today's Classes</Text>
          </View>
          {courses.slice(0, 2).map((course) => (
            <View key={course.id} style={styles.courseRow}>
              <View style={[styles.colorBar, { backgroundColor: course.color }]} />
              <View style={styles.courseInfo}>
                <Text style={styles.courseCode}>{course.code}</Text>
                <Text style={styles.courseMeta}>
                  {course.schedule} • {course.room}
                </Text>
              </View>
              <Ionicons name="time-outline" size={16} color={Colors.primary} />
            </View>
          ))}
        </View>

        {/* Upcoming Deadlines */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="alert-circle-outline" size={20} color={Colors.primary} />
            <Text style={styles.cardTitle}>Upcoming Deadlines</Text>
          </View>
          {upcomingEvents.map((event) => (
            <View key={event.id} style={styles.eventRow}>
              <View style={[styles.eventIcon, { backgroundColor: eventColors[event.type] }]}>
                <Ionicons name={eventIcons[event.type]} size={16} color="#fff" />
              </View>
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventMeta}>
                  {event.course} •{' '}
                  {event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at{' '}
                  {event.time}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* All Courses */}
        <Text style={styles.sectionTitle}>Your Courses</Text>
        <View style={styles.courseGrid}>
          {courses.map((course) => (
            <TouchableOpacity key={course.id} style={styles.courseCard} activeOpacity={0.7}>
              <View style={styles.courseCardHeader}>
                <View style={styles.codeBadge}>
                  <Text style={styles.codeBadgeText}>{course.code}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#687076" />
              </View>
              <Text style={styles.courseName}>{course.name}</Text>
              <Text style={styles.courseDetail}>{course.professor}</Text>
              <Text style={styles.courseDetail}>{course.schedule}</Text>
              <Text style={styles.courseDetail}>{course.room}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 16,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 4,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.dark,
  },
  dateText: {
    fontSize: 14,
    color: Colors.muted,
    marginTop: 4,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark,
  },
  courseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.background,
    borderRadius: 10,
    padding: 12,
  },
  colorBar: {
    width: 4,
    height: 48,
    borderRadius: 4,
  },
  courseInfo: {
    flex: 1,
  },
  courseCode: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.dark,
    marginBottom: 2,
  },
  courseMeta: {
    fontSize: 13,
    color: Colors.muted,
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: Colors.background,
    borderRadius: 10,
    padding: 12,
  },
  eventIcon: {
    padding: 8,
    borderRadius: 10,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.dark,
    marginBottom: 4,
  },
  eventMeta: {
    fontSize: 13,
    color: Colors.muted,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.dark,
  },
  courseGrid: {
    gap: 12,
  },
  courseCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 6,
  },
  courseCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  codeBadge: {
    backgroundColor: Colors.dark,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  codeBadgeText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '600',
  },
  courseName: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.dark,
  },
  courseDetail: {
    fontSize: 13,
    color: Colors.muted,
  },
});
